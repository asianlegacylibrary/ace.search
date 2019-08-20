import '../assets/sass/card.scss'

import React from 'react'

export default ({ source }) => {
    let ordered = {}
    const metaStrings = [
        'page',
        'size',
        'volume',
        'catalognumber',
        'collection',
    ]
    let meta = []
    let main = []
    let auth = []
    let ttl = []

    Object.keys(source)
        .sort()
        .forEach(key => {
            ordered[key] = source[key]
        })

    Object.entries(ordered).forEach((s, i) => {
        if (s[1] && s[1].length > 1) {
            if (
                metaStrings.some(v => {
                    return s[0].indexOf(v) >= 0
                })
            ) {
                meta.push(
                    <p key={i} className="meta-item">
                        <span className="span-title">{s[0]}</span>
                        <span>{s[1]}</span>
                    </p>
                )
            } else if (s[0].includes('tibtext')) {
            } else if (s[0].includes('priauth', 'auth')) {
                auth.push(
                    <p key={i} className="author-item flow-text">
                        <span className="span-title">{s[0]}</span>
                        <span>{s[1]}</span>
                    </p>
                )
            } else if (s[0].includes('ttl', 'title')) {
                ttl.push(
                    <p key={i} className="title-item flow-text">
                        <span className="span-title">{s[0]}</span>
                        <span>{s[1]}</span>
                    </p>
                )
            } else {
                main.push(
                    <p key={i} className="result-source flow-text">
                        <span className="span-title">{s[0]}</span>
                        <span>{s[1]}</span>
                    </p>
                )
            }
        }
    })

    return (
        <React.Fragment>
            <div className="meta-items">{meta}</div>

            {main}

            {auth.length > 0 ? (
                <div className="author-items">
                    <hr />
                    {auth}
                </div>
            ) : null}

            {ttl.length > 0 ? (
                <div className="title-items">
                    <hr />
                    {ttl}
                </div>
            ) : null}
        </React.Fragment>
    )
}
