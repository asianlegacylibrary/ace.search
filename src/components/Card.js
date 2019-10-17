import '../assets/sass/card.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardDetails from './CardDetails'
import CardHighlights from './CardHighlights'
import {
    fetchFullText,
    deleteFullText,
    setFullTextDetails,
    addToFavorites,
    removeFromFavorites,
} from '../store/actions'
import { statics } from '../statics'

class Card extends Component {
    state = {
        activeDetails: false,
        activeFavorite: false,
    }

    componentDidMount() {
        if (this.props.result._id in this.props.favorites) {
            this.setState({ activeFavorite: true })
        }
    }

    handleDetails = e => {
        e.preventDefault()
        this.setState({ activeDetails: !this.state.activeDetails })
    }

    handleSelectedText = (result, e) => {
        e.preventDefault()
        const { textActive, term, definition } = this.props
        if (textActive) {
            this.props.deleteFullText()
        } else {
            if (result.highlight.tibtext) {
                this.props.fetchFullText(term, definition, result)
            } else {
                if (result._source.tibtext) {
                    this.props.setFullTextDetails(result)
                } else {
                    console.log('what to do?')
                }
            }
        }
    }

    handleFavorites = (result, e) => {
        e.preventDefault()
        const setFave = result._id in this.props.favorites ? false : true
        this.setState({ activeFavorite: setFave }, () => {
            if (this.state.activeFavorite) {
                this.props.addToFavorites(result)
            } else {
                this.props.removeFromFavorites(result._id)
            }
        })
    }

    setColColor = col => {
        let colColor
        if (col === 'TG') {
            colColor = 'col-gold'
        } else if (col === 'KG') {
            colColor = 'col-blue'
        } else {
            colColor = 'col-red'
        }
        return colColor
    }

    buildDetails = result => {
        let meta = []
        let author = []
        let title = []
        const checkLoc = (result, key) => {
            let type = ''
            if (result.highlight && result.highlight[key]) {
                type = 'highlight'
            } else if (result._source && result._source[key]) {
                type = '_source'
            }
            return type
        }
        statics.meta_keys.forEach((key, i) => {
            let type = checkLoc(result, key)
            if (type.length > 0) {
                meta.push(
                    <React.Fragment key={i}>
                        <span className="span-title">{key}</span>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: result._source[key],
                            }}
                        />
                        <br />
                    </React.Fragment>
                )
            }
        })
        statics.author_keys.forEach((key, i) => {
            let type = checkLoc(result, key)
            if (type.length > 0) {
                author.push(
                    <p key={i} className="author-item flow-text">
                        <span className="span-title">{key}</span>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: result[type][key],
                            }}
                        />
                    </p>
                )
            }
        })

        statics.title_keys.forEach((key, i) => {
            let type = checkLoc(result, key)
            if (type.length > 0) {
                title.push(
                    <p key={i} className="author-item flow-text">
                        <span className="span-title">{key}</span>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: result[type][key],
                            }}
                        />
                    </p>
                )
            }
        })

        return { meta, author, title }
    }

    buildFullTextButton = result => {
        const activatedText = this.props.textActive ? 'text-active' : ''
        return (
            <React.Fragment>
                <a
                    key={result._id}
                    href="#!"
                    onClick={e => this.handleSelectedText(result, e)}
                    className="text right"
                >
                    <i className={`fal fa-file-alt fa-lg ${activatedText}`} />
                </a>
            </React.Fragment>
        )
    }

    render() {
        const activatedDetails = this.state.activeDetails ? 'make-visible' : ''
        const activatedFavorite = this.state.activeFavorite
            ? 'favorites-active'
            : 'favorites'

        const { result, type, term } = this.props
        if (!result || !type) {
            return null
        }

        const { meta, author, title } = this.buildDetails(result)

        const colColor = this.setColColor(result._source.collection)

        return (
            <React.Fragment>
                <div className="card-content blue-grey-text darken-4">
                    <div className="result-meta">
                        {type === 'texts' ? (
                            <span className={`meta-collection ${colColor}`}>
                                {result._source.collection}
                                {'    '}
                            </span>
                        ) : null}
                        <span className="boldy">ID: </span>
                        <span> {result._id} </span>
                        {type === 'texts' ? (
                            <React.Fragment>
                                <span className="boldy"> Catalog: </span>
                                <span> {result._source.catalognumber}</span>
                            </React.Fragment>
                        ) : null}
                    </div>
                    <CardHighlights result={result} type={type} />
                </div>
                <div className="card-action">
                    <a href="#!" onClick={e => this.handleDetails(e)}>
                        {this.state.activeDetails
                            ? 'Hide Details'
                            : 'Show Details'}
                    </a>
                    <a
                        href="#!"
                        onClick={e => this.handleFavorites(result, e)}
                        className="favorites right"
                    >
                        <i
                            className={`fal fa-star fa-lg ${activatedFavorite}`}
                        />
                    </a>

                    {type === 'texts' && !!result._source.tibtext
                        ? this.buildFullTextButton(result)
                        : null}

                    <div
                        className={`more-content ${activatedDetails} blue-grey-text darken-4`}
                    >
                        <CardDetails
                            result={result}
                            term={term}
                            meta={meta}
                            auth={author}
                            title={title}
                            handleSelectedText={this.handleSelectedText}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites,
    selectedText: state.selectedText,
    term: state.currentSearchTerm,
    definition: state.searchDefinition,
})

export default connect(
    mapStateToProps,
    {
        addToFavorites,
        removeFromFavorites,
        fetchFullText,
        deleteFullText,
        setFullTextDetails,
    }
)(Card)
