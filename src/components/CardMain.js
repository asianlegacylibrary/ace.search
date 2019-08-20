import React from 'react'

export default ({ type, result }) => {
    let remainder = []
    if (type === 'catalogs') {
        const highlightKeys = Object.keys(result.highlight)
        const remainingKeys = ['priauthtib', 'ttltib'].filter(m => {
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
                        dangerouslySetInnerHTML={{ __html: result._source[r] }}
                    />
                </p>
            )
        })
    }

    const mainSection = Object.entries(result.highlight).map((k, i) => {
        return (
            <div key={i} className="result-highlights">
                <p>
                    <span className="span-title">{k[0]}</span>
                    <span
                        className="span-details"
                        dangerouslySetInnerHTML={{ __html: k[1] }}
                    />
                </p>
                {remainder}
            </div>
        )
    })

    return mainSection
}
