import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'

import SearchMenu from './SearchMenu'
import FullText from './FullText'
import SearchResults from './SearchResults'
import { statics } from '../statics'

const mapStateToProps = state => ({
    searchTypeDisplay: state.searchTypeDisplay,
})

const SearchHits = ({ searchTypeDisplay }) => {
    return (
        <div className="row">
            <SearchMenu />

            {searchTypeDisplay.includes(statics.fullTextItem) ? (
                <FullText />
            ) : (
                <SearchResults />
            )}
        </div>
    )
}

export default connect(mapStateToProps)(SearchHits)
