import '../assets/sass/nav.scss'
import M from 'materialize-css'
import React from 'react'
import { connect } from 'react-redux'

class NavSidebar extends React.Component {
    state = {
        sidenavOptions: {
            edge: 'right',
            inDuration: 250,
        },
    }

    componentDidMount() {
        const sidenavElems = document.querySelectorAll('.sidenav')
        const collapsibleElems = document.querySelectorAll('.collapsible')
        M.Sidenav.init(sidenavElems, this.state.sidenavOptions)
        M.Collapsible.init(collapsibleElems)
    }

    renderFavorites = () => {
        const { favorites } = this.props
        return Object.keys(favorites).map(f => {
            return (
                <div key={f}>
                    <span className="result-meta">{f}</span>
                    <span className="meta-item right">
                        ({favorites[f]._index})
                    </span>
                </div>
            )
        })
    }

    renderHistory = () => {
        const { history } = this.props
        return history.map(h => {
            return (
                <div key={h}>
                    <span className="result-meta">{h}</span>
                </div>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <ul id="slide-out" className="sidenav collapsible">
                    <li>
                        <a className="sidenav-close" href="#!">
                            <i className="fal fa-times" />
                        </a>
                    </li>
                    <li>
                        <div className="user-view">
                            <h4 className="blue-text text-darken-4">MENU</h4>
                            <p>
                                Currently, this only shows you a listing of
                                starred items and search term history. Actual
                                functionality coming soon.
                            </p>
                        </div>
                    </li>

                    <li>
                        <div className="collapsible-header waves-effect">
                            <i className="fal fa-heart" />
                            FAVORITES
                        </div>
                        <div className="collapsible-body">
                            <span>{this.renderFavorites()}</span>
                        </div>
                    </li>

                    <li>
                        <div className="collapsible-header waves-effect">
                            <i className="fal fa-search" />
                            SEARCH HISTORY
                        </div>
                        <div className="collapsible-body">
                            <span>{this.renderHistory()}</span>
                        </div>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites,
    history: state.history,
})

export default connect(
    mapStateToProps,
    null
)(NavSidebar)
