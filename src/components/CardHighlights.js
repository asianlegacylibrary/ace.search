import React from 'react'
import { statics } from '../statics'

const getKeysForHighlights = (result, type) => {
    const highlightKeys = Object.keys(result.highlight)

    const highlightRemainingKeys = statics[`hlt_${type}_keys`].filter((m) => {
        if (!(m in result._source) || result._source[m].length <= 0) {
            return null
        }
        return highlightKeys.indexOf(m) === -1
    })
    return { highlightKeys, highlightRemainingKeys }
}

export default ({ result, type }) => {
    if (!('highlight' in result)) {
        return null
    }
    const { highlightKeys, highlightRemainingKeys } = getKeysForHighlights(
        result,
        type
    )
    const remainder = highlightRemainingKeys.map((r, i) => {
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

    const highlightSection = highlightKeys.map((k, i) => {
        return (
            <div key={i} className="result-highlights">
                <p>
                    <span className="span-title">{k}</span>
                    <span
                        className="span-details"
                        dangerouslySetInnerHTML={{
                            __html: result.highlight[k],
                        }}
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
