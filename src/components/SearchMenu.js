import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css'
import { statics } from '../statics'
import { setSearchTypeDisplay } from '../store/actions'
import SearchSubMenu from './SearchSubMenu'

class SearchMenu extends React.Component {
    componentDidMount() {
        M.Tabs.init(this.Tabs, { duration: 400 })
    }
    handleClick = menuItem => {
        this.props.setSearchTypeDisplay(menuItem)
    }
    render() {
        const { selectedText } = this.props
        let menu = [...statics.menuItems] // make a copy
        if (selectedText && !menu.includes(statics.fullTextItem)) {
            menu.push(`${statics.fullTextItem}`)
        }
        return (
            <React.Fragment>
                <div className="col search-menu">
                    <ul
                        ref={Tabs => {
                            this.Tabs = Tabs
                        }}
                        className="tabs"
                    >
                        {menu.map(menuItem => {
                            return (
                                <li key={menuItem} className="tab col s3">
                                    <a
                                        onClick={() =>
                                            this.handleClick(menuItem)
                                        }
                                        href={`#${menuItem}`}
                                    >
                                        {menuItem}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="col search-menu">
                    <div className="sub-menu">
                        {menu.map(menuItem => {
                            return (
                                <SearchSubMenu
                                    key={menuItem}
                                    menuItem={menuItem}
                                />
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selectedText: state.selectedText,
})

export default connect(
    mapStateToProps,
    { setSearchTypeDisplay }
)(SearchMenu)
