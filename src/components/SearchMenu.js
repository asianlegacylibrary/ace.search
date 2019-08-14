import React from 'react'
import { connect } from 'react-redux'
import { setSearchTypeDisplay } from '../store/actions'
import { statics } from '../statics'

const mapStateToProps = state => ({
    searchTypeDisplay: state.searchTypeDisplay,
})

const SearchMenu = ({ searchTypeDisplay, setSearchTypeDisplay }) => {
    const handleClick = menuItem => {
        setSearchTypeDisplay(menuItem)
    }

    return (
        <div className="search-menu">
            <ul className="tabs">
                {statics.menuItems.map((menuItem, i) => {
                    return (
                        <li key={i} className="tab col s3">
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
