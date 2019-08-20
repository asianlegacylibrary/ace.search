import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'

import Card from './Card'
import { setSearchTypeDisplay } from '../store/actions'

class SearchHitsResults extends React.Component {
    render() {
        const { catalogs, texts, searchTypeDisplay } = this.props
        if (!catalogs || !texts) {
            return null
        }

        let currentResults = (
            <div className="card grey lighten-3">
                <div className="card-content blue-grey-text darken-4">
                    NO RESULTS
                </div>
            </div>
        )

        const results = searchTypeDisplay === 'catalogs' ? catalogs : texts

        if (results.hits.length > 0) {
            currentResults = results.hits.map(result => {
                return (
                    <div key={result._id} className="card grey lighten-3">
                        <Card type={searchTypeDisplay} result={result} />
                    </div>
                )
            })
        }

        return <div className="search-results">{currentResults}</div>
    }
}

const mapStateToProps = state => ({
    catalogs: state.results.catalogs,
    texts: state.results.texts,
    searchTypeDisplay: state.searchTypeDisplay,
})

export default connect(
    mapStateToProps,
    { setSearchTypeDisplay }
)(SearchHitsResults)
