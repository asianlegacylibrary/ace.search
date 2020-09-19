import '../assets/sass/card.scss'
import React from 'react'
import { statics } from '../statics'

const buildDetails = (result) => {
    let meta = []
    let author = []
    let title = []
    let colophon = []
    const checkLoc = (result, key) => {
        let type = ''
        if ('highlight' in result && result.highlight[key]) {
            type = 'highlight'
        } else if (result._source[key]) {
            type = '_source'
        }
        return type
    }
    statics.meta_keys.forEach((key, i) => {
        let type = checkLoc(result, key)
        if (type.length > 0) {
            meta.push(
                <React.Fragment key={i}>
                    <span className="span-title">{key}</span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: result._source[key],
                        }}
                    />
                    <br />
                </React.Fragment>
            )
        }
    })
    statics.author_keys.forEach((key, i) => {
        let type = checkLoc(result, key)
        if (type.length > 0) {
            author.push(
                <p key={i} className="author-item flow-text">
                    <span className="span-title">{key}</span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: result[type][key],
                        }}
                    />
                </p>
            )
        }
    })

    statics.title_keys.forEach((key, i) => {
        let type = checkLoc(result, key)
        if (type.length > 0) {
            title.push(
                <p key={i} className="author-item flow-text">
                    <span className="span-title">{key}</span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: result[type][key],
                        }}
                    />
                </p>
            )
        }
    })
    if (result._source.colophon && result._source.colophon.length > 0) {
        let type = checkLoc(result, 'colophon')
        if (type.length > 0) {
            colophon.push(
                <p key="colophon" className="author-item flow-text">
                    <span className="span-title">COLOPHON</span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: result[type].colophon,
                        }}
                    />
                </p>
            )
        }
    }

    return { meta, author, title, colophon }
}

export default ({ result, handleSelectedText }) => {
    let full = []
    const { meta, author, title, colophon } = buildDetails(result)

    if (result._source.tibtext && result._source.tibtext.length > 0) {
        full.push(
            <a
                key={result._id}
                href="#!"
                className="full-text-selection right"
                onClick={(e) => handleSelectedText(result, e)}
            >
                Select Full Text <i className="fa fa-file-alt fa-lg" />
            </a>
        )
    }

    return (
        <React.Fragment>
            <div className="meta-items">
                <p className="meta-item">{meta}</p>
            </div>

            {author.length > 0 ? (
                <div className="author-items">
                    <hr />
                    {author}
                </div>
            ) : null}

            {title.length > 0 ? (
                <div className="title-items">
                    <hr />
                    {title}
                </div>
            ) : null}

            {colophon.length > 0 ? colophon : null}

            {full.length > 0 ? (
                <div className="meta-items">
                    <p className="meta-item">{full}</p>
                </div>
            ) : null}
        </React.Fragment>
    )
}
