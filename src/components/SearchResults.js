import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'

const SearchResults = ({
    catalogs,
    texts,
    searchTypeDisplay,
    selectedText,
    searching,
    resultsProp,
}) => {
    if (resultsProp.error) {
        return (
            <div className="search-results">
                <div className="card grey lighten-3">
                    <div className="card-content blue-grey-text darken-4">
                        THERE HAS BEEN A NETWORK ERROR.
                    </div>
                </div>
            </div>
        )
    }

    if (!catalogs || !texts) {
        return null
    }
    if (searching) {
        return (
            <div className="search-results">
                <div className="card grey lighten-3">
                    <div className="card-content blue-grey-text darken-4">
                        SEARCHING...
                    </div>
                </div>
            </div>
        )
    }

    let currentResults = (
        <div className="card grey lighten-3">
            <div className="card-content blue-grey-text darken-4">
                NO RESULTS
            </div>
        </div>
    )

    const results = searchTypeDisplay === 'catalogs' ? catalogs : texts

    if (results.hits && results.hits.length > 0) {
        currentResults = results.hits.map(result => {
            const textActive =
                selectedText && selectedText.details._id === result._id
            return (
                <div key={result._id} className="card grey lighten-3 hoverable">
                    <Card
                        type={searchTypeDisplay}
                        result={result}
                        textActive={textActive}
                    />
                </div>
            )
        })
    }
    return <div className="search-results">{currentResults}</div>
}

const mapStateToProps = state => ({
    searching: state.results.isFetching,
    catalogs: state.results.catalogs,
    resultsProp: state.results,
    texts: state.results.texts,
    searchTypeDisplay: state.searchTypeDisplay,
    selectedText: state.selectedText,
})

export default connect(mapStateToProps)(SearchResults)
