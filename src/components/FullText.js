import '../assets/sass/fulltext.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseLines } from '../store/utilities'

class FullText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialMatch: true,
            currentPageIdx: 0,
            matchIdx: 0,
        }

        this.btnEnables = {
            disableMin: false,
            disableMax: false,
            disableInc: false,
            disableDec: false,
            disableMatchDec: false,
            disableMatchInc: false,
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDowns, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDowns, false)
    }

    keyDowns = e => {
        if (e.key === 'ArrowRight') {
            if (
                this.state.currentPageIdx <
                this.props.text.fulltext.length - 1
            ) {
                this.setState({ currentPageIdx: this.state.currentPageIdx + 1 })
            }
        } else if (e.key === 'ArrowLeft') {
            if (this.state.currentPageIdx > 0) {
                this.setState({ currentPageIdx: this.state.currentPageIdx - 1 })
            }
        }
    }

    selectedPage = renderedPageIdx => {
        return this.props.text.fulltext[renderedPageIdx]
    }

    setPage = name => {
        const { termLocations } = this.props.text
        if (name === 'matchIdx') {
            if (
                termLocations[this.state.matchIdx] !== this.state.currentPageIdx
            ) {
                this.setState({
                    currentPageIdx: termLocations[this.state.matchIdx],
                })
            }
        } else {
            // check if you're at a page in the match index
            let matchIndex = termLocations.findIndex(
                idx => idx === this.state.currentPageIdx
            )
            // and if you are, match it
            if (matchIndex >= 0) {
                this.setState({ matchIdx: matchIndex })

                // but what if you are NOT at a page in match index
                // we still need to know where in pages we are
            } else {
                if (this.state.currentPageIdx < termLocations[0]) {
                    this.setState({ matchIdx: -1 })
                }
                // check if current page is bigger than last match id
                else if (
                    this.state.currentPageIdx >
                    termLocations[termLocations.length - 1]
                ) {
                    this.setState({
                        matchIdx: termLocations.length,
                    })
                }
            }
        }
    }

    handleCounter = (e, name, type, referenceNum = 0) => {
        e.preventDefault()

        let max = referenceNum > 0 ? referenceNum - 1 : referenceNum
        switch (type) {
            case 'min':
                this.setState({ [name]: 0 }, () => this.setPage(name))
                break
            case 'max':
                this.setState({ [name]: max }, () => this.setPage(name))
                break
            case 'increase':
                if (name === 'matchIdx') {
                    if (this.state.initialMatch) {
                        this.setState({ initialMatch: false })
                        if (
                            this.state.currentPageIdx !==
                            this.props.text.termLocations[0]
                        ) {
                            this.setState({ [name]: 0 }, () => {
                                this.setPage(name)
                            })
                        }
                    } else {
                        this.setState(
                            prevState => ({
                                [name]: prevState[name] + 1,
                            }),
                            () => {
                                this.setPage(name)
                            }
                        )
                    }
                } else {
                    this.setState(
                        prevState => ({ [name]: prevState[name] + 1 }),
                        () => this.setPage(name)
                    )
                }
                break
            case 'decrease':
                this.setState(
                    prevState => ({ [name]: prevState[name] - 1 }),
                    () => {
                        this.setPage(name)
                    }
                )
                break
            default:
                break
        }
    }

    setUpMatches = () => {
        const { currentPageIdx, matchIdx } = this.state
        const { termLocations, termOccurrences, fulltext } = this.props.text

        let matches = termOccurrences > 1 ? 'matches' : 'match'
        let msg
        // $$$ switch out term for definition
        // to do this must parse out to readable string
        if (termLocations.length > 1) {
            msg = `${termOccurrences} ${matches} found on ${termLocations.length} pages.`
        } else {
            msg = `${termOccurrences} ${matches} found.`
        }

        let msgSupplement = null
        let btns = null
        if (termLocations.length === 1) {
            msgSupplement = (
                <a
                    href="#/"
                    className="go-to-span"
                    disabled={
                        termLocations[0] === currentPageIdx ? true : false
                    }
                    onClick={e => this.handleCounter(e, 'matchIdx', 'min')}
                >
                    {`  GO TO MATCH ${fulltext[termLocations[0]].id}`}
                </a>
            )
        } else {
            btns = (
                <React.Fragment>
                    <a
                        href="#/"
                        className="btn-flat"
                        disabled={matchIdx <= 0 ? true : false}
                        onClick={e =>
                            this.handleCounter(
                                e,
                                'matchIdx',
                                'decrease',
                                termLocations.length
                            )
                        }
                    >
                        PREV MATCH
                    </a>
                    <a
                        href="#/"
                        className="btn-flat"
                        disabled={
                            matchIdx >= termLocations.length - 1 ? true : false
                        }
                        onClick={e =>
                            this.handleCounter(
                                e,
                                'matchIdx',
                                'increase',
                                termLocations.length
                            )
                        }
                    >
                        NEXT MATCH
                    </a>
                </React.Fragment>
            )
        }

        return (
            <div className="full-text-details">
                <p className="meta-item">
                    <span dangerouslySetInnerHTML={{ __html: msg }} />
                    <span>{msgSupplement}</span>
                </p>
                <span className="full-text-details">{btns}</span>
            </div>
        )
    }

    renderCtls() {
        const { fulltext } = this.props.text
        const { currentPageIdx } = this.state

        if (fulltext.length === 1) {
            return null
        }

        return (
            <div className="full-text-ctls">
                <a
                    href="#!"
                    disabled={currentPageIdx <= 0 ? true : false}
                    className="btn-flat"
                    onClick={e =>
                        this.handleCounter(e, 'currentPageIdx', 'min')
                    }
                >
                    <i className="fad fa-chevron-double-left" />
                </a>
                <a
                    href="#!"
                    disabled={currentPageIdx <= 0 ? true : false}
                    className="btn-flat"
                    onClick={e =>
                        this.handleCounter(
                            e,
                            'currentPageIdx',
                            'decrease',
                            fulltext.length
                        )
                    }
                >
                    <i className="fad fa-chevron-left" />
                </a>
                <a
                    href="#!"
                    disabled={
                        currentPageIdx >= fulltext.length - 1 ? true : false
                    }
                    className="btn-flat"
                    onClick={e =>
                        this.handleCounter(
                            e,
                            'currentPageIdx',
                            'increase',
                            fulltext.length
                        )
                    }
                >
                    <i className="fad fa-chevron-right" />
                </a>
                <a
                    href="#!"
                    disabled={
                        currentPageIdx >= fulltext.length - 1 ? true : false
                    }
                    className="btn-flat"
                    onClick={e =>
                        this.handleCounter(
                            e,
                            'currentPageIdx',
                            'max',
                            fulltext.length
                        )
                    }
                >
                    <i className="fad fa-chevron-double-right" />
                </a>
                <p className="full-text-pages">{fulltext[currentPageIdx].id}</p>
            </div>
        )
    }

    render() {
        if (!this.props.text || this.props.text.isFetching) {
            return null
        }

        const { fulltext, termLocations } = this.props.text

        const selectedPage = this.selectedPage(this.state.currentPageIdx)

        const firstPage =
            fulltext[0].id === '@000' && fulltext.length > 1
                ? fulltext[1].id
                : fulltext[0].id

        let paginationMsg = `Folios ${firstPage} to ${fulltext[fulltext.length - 1].id}.`
        if (fulltext[fulltext.length - 1].id === '@000') {
            paginationMsg = `Text not split into folios.`
        }
        return (
            <div className="card grey lighten-3">
                <div className="card-content blue-grey-text darken-4">
                    <p className="result-meta">{`This text has approximately ${fulltext.length} pages. ${paginationMsg}`}</p>

                    {termLocations.length && fulltext.length > 0
                        ? this.setUpMatches()
                        : null}

                    {this.renderCtls()}

                    <div className="flow-text">
                        <p
                            className="full-text"
                            style={{ whiteSpace: 'pre-wrap' }}
                            dangerouslySetInnerHTML={{
                                __html: parseLines(selectedPage.data),
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.selectedText,
    term: state.currentSearchTerm,
    def: state.searchDefinition,
})

export default connect(mapStateToProps)(FullText)
