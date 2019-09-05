import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'
import { setSearchTypeDisplay } from '../store/actions'
import { statics } from '../statics'

const mapStateToProps = state => ({
    searchTypeDisplay: state.searchTypeDisplay,
    results: state.results,
    selectedText: state.selectedText,
})

const SearchMenu = ({
    searchTypeDisplay,
    setSearchTypeDisplay,
    results,
    selectedText,
}) => {
    const handleClick = menuItem => {
        setSearchTypeDisplay(menuItem)
    }

    if (results.length === 0) {
        return null
    }
    let menu = [...statics.menuItems] // make a copy
    if (selectedText && !menu.includes(statics.fullTextItem)) {
        menu.push(`${statics.fullTextItem} (id: ${selectedText.details._id})`)
    }
    return (
        <div className="search-menu">
            <ul className="tabs">
                {menu.map(menuItem => {
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
