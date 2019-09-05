import React from 'react'
import { getHighlightsAndRemainder } from '../store/utilities'

export default ({ type, result }) => {
    const { highlightKeys, highlightRemainingKeys } = getHighlightsAndRemainder(
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
