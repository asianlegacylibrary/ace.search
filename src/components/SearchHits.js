import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'

import { Card } from './Card'
import SearchMenu from './SearchMenu'
import { setSearchTypeDisplay } from '../store/actions'

class SearchHits extends React.Component {
    render() {
        const { catalogs, texts, searchTypeDisplay } = this.props
        if (!catalogs || !texts) {
            return null
        }

        let currentResults = (
            <div className="card grey lighten-3">
                <div className="card-content blue-grey-text darken-4">
                    No Results
                </div>
            </div>
        )

        const results = searchTypeDisplay === 'catalogs' ? catalogs : texts

        if (results.hits.length > 0) {
            currentResults = results.hits.map((result, i) => {
                return (
                    <div key={i} className="card grey lighten-3">
                        <Card type={searchTypeDisplay} result={result} />
                    </div>
                )
            })
        }

        return (
            <div className="row">
                <SearchMenu />
                <div className="search-results">
                    <div className="row">
                        <div className="col s12">{currentResults}</div>
                    </div>
                </div>
            </div>
        )
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
)(SearchHits)
