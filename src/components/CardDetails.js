import '../assets/sass/card.scss'

import React from 'react'
import { connect } from 'react-redux'
import * as types from '../store/types'

const CardDetails = ({ result, dispatch }) => {
    const { _source } = result
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
    let full = []

    Object.keys(_source)
        .sort()
        .forEach(key => {
            ordered[key] = _source[key]
        })

    Object.entries(ordered).forEach((s, i) => {
        if (s[1] && s[1].length > 1) {
            if (
                metaStrings.some(v => {
                    return s[0].indexOf(v) >= 0
                })
            ) {
                meta.push(
                    <React.Fragment key={i}>
                        <span className="span-title">{s[0]}</span>
                        <span>{s[1]}</span>
                        <br />
                    </React.Fragment>
                )
            } else if (s[0].includes('tibtext')) {
                // do nothing with FULL TEXT for now...
                full.push(
                    <a
                        key={i}
                        href="#!"
                        className="full-text-selection right"
                        onClick={() =>
                            dispatch({
                                type: types.SET_FULL_TEXT,
                                payload: result,
                            })
                        }
                    >
                        Select Full Text <i className="fal fa-file-alt fa-lg" />
                    </a>
                )
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
            <div className="meta-items">
                <p className="meta-item">{meta}</p>
            </div>

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

            <div className="meta-items">
                <p className="meta-item">{full}</p>
            </div>
        </React.Fragment>
    )
}

export default connect()(CardDetails)
