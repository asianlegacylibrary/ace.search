import '../assets/sass/search.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchResults,
    setOffsets,
    resetOffsets,
    addTermToHistory,
    setCurrentSearchTerm,
    deleteFullText,
    clearResults,
} from '../store/actions'
import { getRandomInt } from '../store/utilities'
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
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ term: e.target.value.toUpperCase() })
    }

    handleNext = () => {
        const offset = this.props[`offset_${this.props.searchTypeDisplay}`]
        const total = this.props[`total_${this.props.searchTypeDisplay}`]
        let newOffset = offset

        if (total > offset + statics.searchOptions.resultSetSize) {
            newOffset = offset + statics.searchOptions.resultSetSize

            this.props.fetchResults(
                this.state.term,
                newOffset,
                this.props.searchTypeDisplay
            )
        }
    }

    handlePrev = () => {
        const offset = this.props[`offset_${this.props.searchTypeDisplay}`]
        let newOffset = 0
        if (offset - statics.searchOptions.resultSetSize >= 0) {
            newOffset = offset - statics.searchOptions.resultSetSize
            this.props.fetchResults(
                this.state.term,
                newOffset,
                this.props.searchTypeDisplay
            )
        } else {
            this.props.setOffsets(this.props.searchTypeDisplay, 0)
        }
    }

    handleNewSearch = e => {
        e.preventDefault()
        const {
            resetOffsets,
            fetchResults,
            addTermToHistory,
            setCurrentSearchTerm,
            deleteFullText,
        } = this.props
        resetOffsets()
        clearResults()
        deleteFullText()
        fetchResults(this.state.term, 0)
        addTermToHistory(this.state.term)
        setCurrentSearchTerm(this.state.term)
    }

    setUpControls = () => {
        const offset = this.props[`offset_${this.props.searchTypeDisplay}`]

        const properOffset =
            offset + statics.searchOptions.resultSetSize >
            this.props[`total_${this.props.searchTypeDisplay}`]
                ? this.props[`total_${this.props.searchTypeDisplay}`]
                : offset + statics.searchOptions.resultSetSize

        let disableNext =
            this.props[`total_${this.props.searchTypeDisplay}`] <=
                offset + statics.searchOptions.resultSetSize ||
            this.props.currentlyFetchingResults ||
            this.props.searchTypeDisplay.includes(statics.fullTextItem)

        let disablePrev =
            this.props[`total_${this.props.searchTypeDisplay}`] <=
                statics.searchOptions.resultSetSize ||
            offset <= 0 ||
            this.props.currentlyFetchingResults ||
            this.props.searchTypeDisplay.includes(statics.fullTextItem)

        let paginationMsg =
            this.props[`total_${this.props.searchTypeDisplay}`] > 0
                ? `Showing <span class="boldy">${offset +
                      1} to ${properOffset} </span> of ${
                      this.props[`total_${this.props.searchTypeDisplay}`]
                  }`
                : `&nbsp;`

        return { disableNext, disablePrev, paginationMsg }
    }

    render() {
        const { disableNext, disablePrev, paginationMsg } = this.setUpControls()

        return (
            <div className="row">
                <div className="search-form">
                    <input
                        autoFocus
                        type="text"
                        value={this.state.term}
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e =>
                            e.key === 'Enter' ? this.handleNewSearch(e) : null
                        }
                    />

                    <button
                        className="waves-effect waves-light btn wide"
                        disabled={this.props.currentlyFetchingResults}
                        onClick={e => this.handleNewSearch(e)}
                    >
                        {this.props.currentlyFetchingResults
                            ? 'Searching'
                            : `Search`}
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
        total_catalogs: state.results.catalogs
            ? state.results.catalogs.total
            : 0,
        total_texts: state.results.texts ? state.results.texts.total : 0,
        offset_catalogs: state.offsets.catalogs,
        offset_texts: state.offsets.texts,
        searchTypeDisplay: state.searchTypeDisplay,
        currentlyFetchingResults: state.results.isFetching,
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
        deleteFullText,
        clearResults,
    }
)(SearchForm)
