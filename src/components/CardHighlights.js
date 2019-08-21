import React from 'react'
import { statics } from '../statics'

export default ({ type, result }) => {
    let remainder = []

    const highlightKeys = Object.keys(result.highlight)

    const remainingKeys = statics[`${type}_keys`].filter(m => {
        if (result._source[m].length <= 0) {
            return null
        }
        return highlightKeys.indexOf(m) === -1
    })

    remainder = remainingKeys.map((r, i) => {
        return (
            <p key={i}>
                <span className="span-title">{r}</span>
                <span
                    className="span-details"
                    dangerouslySetInnerHTML={{
                        __html: result._source[r],
                    }}
                />
            </p>
        )
    })

    const highlightSection = Object.entries(result.highlight).map((k, i) => {
        return (
            <div key={i} className="result-highlights">
                <p>
                    <span className="span-title">{k[0]}</span>
                    <span
                        className="span-details"
                        dangerouslySetInnerHTML={{ __html: k[1] }}
                    />
                </p>
            </div>
        )
    })

    return (
        <React.Fragment>
            {highlightSection}
            {remainder}
        </React.Fragment>
    )
}
