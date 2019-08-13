import '../assets/sass/search.scss'
import React from 'react'
import { connect } from 'react-redux'

import { Card } from './Card'
import { setSearchTypeDisplay } from '../store/actions'
import { config } from '../config'

class SearchHits extends React.Component {
    handleClick = menuItem => {
        this.props.setSearchTypeDisplay(menuItem)
    }

    render() {
        const { catalogs, texts } = this.props
        if (!catalogs || !texts) {
            return null
        }

        const results =
            this.props.searchTypeDisplay === 'catalogs' ? catalogs : texts

        const current = results.hits.map((result, i) => {
            return (
                // <div key={i} className="row">
                // <div className="col s12">
                <div key={i} className="card grey lighten-3">
                    <Card type={this.props.searchTypeDisplay} result={result} />
                    {/* </div> */}
                </div>
                // </div>
            )
        })

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            {config.menuItems.map((menuItem, i) => {
                                return (
                                    <li key={i} className="tab col s3">
                                        <a
                                            href="#!"
                                            className={
                                                this.props.searchTypeDisplay ===
                                                menuItem
                                                    ? 'active'
                                                    : ''
                                            }
                                            onClick={() =>
                                                this.handleClick(menuItem)
                                            }
                                        >
                                            {menuItem}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">{current}</div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        catalogs: state.results.catalogs,
        texts: state.results.texts,
        searchTypeDisplay: state.searchTypeDisplay,
    }
}
export default connect(
    mapStateToProps,
    { setSearchTypeDisplay }
)(SearchHits)
