import React from 'react'
import { getRemainderAfterHighlights } from '../store/utilities'

export default ({ type, result }) => {
    let remainder = []
    const remainingKeys = getRemainderAfterHighlights(result, type)

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
