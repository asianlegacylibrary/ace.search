import '../assets/sass/search.scss'
import M from 'materialize-css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchPlusItem from './SearchPlusItem'
import {
    fetchResults,
    setOffsets,
    resetOffsets,
    addTermToHistory,
    setCurrentSearchTerm,
    setCurrentSearchDefinition,
    deleteFullText,
    clearResults,
} from '../store/actions'
import {
    getRandomInt,
    ID,
    createBooleanBlocks,
    groupBy2,
} from '../store/utilities'
import { statics } from '../statics'

class SearchForm extends Component {
    state = {
        term:
            statics.searchTerms[
                getRandomInt(0, statics.searchTerms.length - 1)
            ],
        offsetCurrent: 0,
        offsetSize: statics.searchOptions.resultSetSize,
        initialLoad: true,
        searchDefinition: [],
        refreshDefinition: false,
        items: [],
        blocks: [],
    }

    componentDidMount = () => {
        const elems = document.querySelectorAll('.fixed-action-btn')
        M.FloatingActionButton.init(elems, {
            direction: 'right',
            hoverEnabled: true,
        })
    }

    updateItems = (id, type, itemState) => {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === id ? { ...item, [type]: itemState } : item
            ),
        }))
    }

    handleDelete = id => {
        this.setState({
            items: this.state.items.filter(item => item.id !== id),
        })
    }

    handleAddSearchNew = (e, type) => {
        e.preventDefault()
        if (type.toUpperCase() === 'OR') {
            this.setState(prevState => ({
                items: [
                    ...prevState.items,
                    { id: ID(), operator: type.toUpperCase() },
                ],
            }))
        } else {
            this.setState(prevState => ({
                items: [
                    ...prevState.items,
                    { id: ID(), term: '', operator: type.toUpperCase() },
                ],
            }))
        }
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ term: e.target.value.toUpperCase() })
    }

    handleNext = () => {
        const offset = this.props.offsets[this.props.searchTypeDisplay]
        const total = this.props.results[this.props.searchTypeDisplay].total
        let newOffset = offset

        if (total > offset + statics.searchOptions.resultSetSize) {
            newOffset = offset + statics.searchOptions.resultSetSize

            this.props.fetchResults(
                this.props.searchDef,
                newOffset,
                this.props.searchTypeDisplay
            )
        }
    }

    handlePrev = () => {
        const offset = this.props.offsets[this.props.searchTypeDisplay]
        let newOffset = 0
        if (offset - statics.searchOptions.resultSetSize >= 0) {
            newOffset = offset - statics.searchOptions.resultSetSize
            this.props.fetchResults(
                this.props.searchDef,
                newOffset,
                this.props.searchTypeDisplay
            )
        } else {
            this.props.setOffsets(this.props.searchTypeDisplay, 0)
        }
    }

    updateSearchDefinitionAndFetch = () => {
        let update = []
        let newSearchDefinition = [...this.state.items]
        let primaryOperatorObj = {
            id: ID(),
            term: this.state.term,
            operator: 'AND',
        }

        newSearchDefinition.unshift(primaryOperatorObj)
        update = createBooleanBlocks(newSearchDefinition)
        this.setState({ searchDefinition: update }, () => {
            this.props.fetchResults(this.state.searchDefinition, 0)
        })
    }

    handleNewSearch = e => {
        e.preventDefault()
        this.updateSearchDefinitionAndFetch()
        const {
            resetOffsets,
            clearResults,
            addTermToHistory,
            deleteFullText,
        } = this.props
        resetOffsets()
        clearResults()
        deleteFullText()
        addTermToHistory(this.state.term)
    }

    setUpControls = () => {
        const offset = this.props.offsets[this.props.searchTypeDisplay]
        const total = this.props.results[this.props.searchTypeDisplay]
            ? this.props.results[this.props.searchTypeDisplay].total
            : 0
        const properOffset =
            offset + statics.searchOptions.resultSetSize > total
                ? total
                : offset + statics.searchOptions.resultSetSize

        let disableNext =
            total <= offset + statics.searchOptions.resultSetSize ||
            this.props.currentlyFetchingResults ||
            this.props.searchTypeDisplay.includes(statics.fullTextItem)

        let disablePrev =
            total <= statics.searchOptions.resultSetSize ||
            offset <= 0 ||
            this.props.currentlyFetchingResults ||
            this.props.searchTypeDisplay.includes(statics.fullTextItem)

        let paginationMsg =
            total > 0
                ? `Showing <span className="boldy">${offset +
                      1} to ${properOffset} </span> of ${total}`
                : `&nbsp;`

        return { disableNext, disablePrev, paginationMsg }
    }

    buildItems = () => {
        return this.state.items.map(item => {
            return (
                <SearchPlusItem
                    key={item.id}
                    item={item}
                    updateItem={this.updateItems}
                    handleDelete={this.handleDelete}
                    handleNewSearch={e => this.handleNewSearch(e)}
                />
            )
        })
    }

    render() {
        const { disableNext, disablePrev, paginationMsg } = this.setUpControls()

        let items = this.state.items.length > 0 ? this.buildItems() : null

        return (
            <div className="row">
                <div className="search-form">
                    <input
                        className="search-input"
                        autoFocus
                        type="text"
                        value={this.state.term}
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e =>
                            e.key === 'Enter' ? this.handleNewSearch(e) : null
                        }
                    />

                    {items}
                    <div className="search-plus-btn">
                        <div className="fixed-action-btn definition-type">
                            <a href="#!" className="btn-floating btn-large">
                                <i className="fa fa-plus" />
                            </a>
                            <ul>
                                <li>
                                    <a
                                        href="#!"
                                        onClick={e =>
                                            this.handleAddSearchNew(e, 'and')
                                        }
                                        className="btn-floating definition-type-sub"
                                    >
                                        AND
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        onClick={e =>
                                            this.handleAddSearchNew(e, 'or')
                                        }
                                        className="btn-floating definition-type-sub"
                                    >
                                        OR
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        onClick={e =>
                                            this.handleAddSearchNew(e, 'not')
                                        }
                                        className="btn-floating definition-type-sub"
                                    >
                                        NOT
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <button
                        className="search-plus btn-flat"
                        onClick={e => this.handleAddSearch(e)}
                    >
                        <i className="fal fa-plus" />
                    </button> */}

                    <button
                        className="waves-effect waves-light btn wide"
                        disabled={this.props.results.isFetching}
                        onClick={e => this.handleNewSearch(e)}
                    >
                        {this.props.results.isFetching ? 'Searching' : `Search`}
                    </button>
                    <div className="result-pagination">
                        <button
                            className="waves-effect waves-light btn"
                            disabled={disablePrev}
                            onClick={this.handlePrev}
                        >
                            PREV
                        </button>

                        <button
                            className="waves-effect waves-light btn"
                            disabled={disableNext}
                            onClick={this.handleNext}
                        >
                            NEXT
                        </button>
                    </div>
                    <div
                        className="result-pagination-msg"
                        dangerouslySetInnerHTML={{
                            __html: paginationMsg,
                        }}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        offsets: state.offsets,
        searchTypeDisplay: state.searchTypeDisplay,
        currentlyFetchingResults: state.results.isFetching,
        searchDef: state.searchDefinition,
    }
}

export default connect(
    mapStateToProps,
    {
        fetchResults,
        setOffsets,
        resetOffsets,
        addTermToHistory,
        setCurrentSearchTerm,
        setCurrentSearchDefinition,
        deleteFullText,
        clearResults,
    }
)(SearchForm)
