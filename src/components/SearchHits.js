import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'
import FullText from './FullText'
import SearchResults from './SearchResults'
import { statics } from '../statics'
import SearchMenu from './SearchMenu'

const mapStateToProps = state => ({
    searchTypeDisplay: state.searchTypeDisplay,
})

const SearchHits = ({ searchTypeDisplay }) => {
    return (
        <React.Fragment>
            <div className="row">
                <SearchMenu />
            </div>
            <div className="row">
                {searchTypeDisplay.includes(statics.fullTextItem) ? (
                    <FullText />
                ) : (
                    <SearchResults />
                )}
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps)(SearchHits)
