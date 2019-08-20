import React from 'react'
import { connect } from 'react-redux'
import { setSearchTypeDisplay } from '../store/actions'
import { statics } from '../statics'

const mapStateToProps = state => ({
    searchTypeDisplay: state.searchTypeDisplay,
    results: state.results,
})

const SearchMenu = ({ searchTypeDisplay, setSearchTypeDisplay, results }) => {
    const handleClick = menuItem => {
        setSearchTypeDisplay(menuItem)
    }
    if (results.length === 0) {
        return null
    }
    return (
        <div className="search-menu">
            <ul className="tabs">
                {statics.menuItems.map(menuItem => {
                    return (
                        <li key={menuItem} className="tab col s3">
                            <a
                                href="#!"
                                className={
                                    searchTypeDisplay === menuItem
                                        ? 'active'
                                        : ''
                                }
                                onClick={() => handleClick(menuItem)}
                            >
                                {menuItem}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default connect(
    mapStateToProps,
    { setSearchTypeDisplay }
)(SearchMenu)
