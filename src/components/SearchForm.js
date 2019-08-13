import '../assets/sass/search.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchResults, setOffsets } from '../store/actions'
import { getRandomInt } from '../store/utilities'
import { config } from '../config'

class SearchForm extends Component {
    state = {
        term:
            config.searchTerms[getRandomInt(0, config.searchTerms.length - 1)],
        offsetCurrent: 0,
        offsetSize: config.searchOptions.resultSetSize,
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

        if (total > offset + config.searchOptions.resultSetSize) {
            newOffset = offset + config.searchOptions.resultSetSize
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
        if (offset - config.searchOptions.resultSetSize >= 0) {
            newOffset = offset - config.searchOptions.resultSetSize
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

        this.props.fetchResults(this.state.term, 0)
    }

    setUpControls = () => {
        const offset = this.props[`offset_${this.props.searchTypeDisplay}`]

        const properOffset =
            offset + config.searchOptions.resultSetSize >
            this.props[`total_${this.props.searchTypeDisplay}`]
                ? this.props[`total_${this.props.searchTypeDisplay}`]
                : offset + config.searchOptions.resultSetSize

        let disableNext =
            this.props[`total_${this.props.searchTypeDisplay}`] <=
                offset + config.searchOptions.resultSetSize ||
            this.props.currentlyFetchingResults

        let disablePrev =
            this.props[`total_${this.props.searchTypeDisplay}`] <=
                config.searchOptions.resultSetSize ||
            offset <= 0 ||
            this.props.currentlyFetchingResults

        let paginationMsg =
            this.props[`total_${this.props.searchTypeDisplay}`] > 0
                ? `Showing <span class="boldy">${offset +
                      1} to ${properOffset} </span> of ${
                      this.props[`total_${this.props.searchTypeDisplay}`]
                  }`
                : ``

        return { disableNext, disablePrev, paginationMsg }
    }

    render() {
        const { disableNext, disablePrev, paginationMsg } = this.setUpControls()

        return (
            <React.Fragment>
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
                        className="waves-effect waves-light btn"
                        disabled={this.props.currentlyFetchingResults}
                        onClick={e => this.handleNewSearch(e)}
                    >
                        {this.props.currentlyFetchingResults
                            ? 'Searching'
                            : 'Search'}
                    </button>
                    <div className="result-pagination">
                        <button
                            className="waves-effect waves-light btn"
                            disabled={disablePrev}
                            onClick={this.handlePrev}
                        >
                            PREV
                        </button>
                        <span
                            className="result-pagination-msg"
                            dangerouslySetInnerHTML={{
                                __html: paginationMsg,
                            }}
                        />
                        <button
                            className="waves-effect waves-light btn"
                            disabled={disableNext}
                            onClick={this.handleNext}
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            </React.Fragment>
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
    { fetchResults, setOffsets }
)(SearchForm)
