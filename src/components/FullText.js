import '../assets/sass/fulltext.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseLines } from '../store/utilities'

class FullText extends Component {
    state = {
        currentPage: null,
        initialMatch: true,
        count: 0,
        matchCount: 0,
        btnEnables: {
            disableMin: false,
            disableMax: false,
            disableInc: false,
            disableDec: false,
            disableMatchDec: false,
            disableMatchInc: false,
        },
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDowns, false)
        this.setState({ currentPage: this.props.text.fulltext[0].id })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDowns, false)
    }

    keyDowns = e => {
        if (e.key === 'ArrowRight') {
            if (this.state.count < this.props.text.fulltext.length - 1) {
                this.setState({ count: this.state.count + 1 })
            }
        } else if (e.key === 'ArrowLeft') {
            if (this.state.count > 0) {
                this.setState({ count: this.state.count - 1 })
            }
        }
    }

    selectedPage = renderedPageId => {
        return this.props.text.fulltext.find(p => p.id === renderedPageId)
    }

    setPage = name => {
        const { termLocations, fulltext } = this.props.text
        const { matchCount, count } = this.state
        if (name === 'matchCount') {
            this.setState({
                currentPage: termLocations[matchCount],
                // set count to array index of fulltext[idx].id
                count: fulltext.findIndex(
                    x =>
                        x.id === this.selectedPage(termLocations[matchCount]).id
                ),
            })
        } else {
            this.setState({
                currentPage: fulltext[count].id,
            })
        }
    }

    handleCounter = (name, type, referenceNum = 0) => {
        let max = referenceNum > 0 ? referenceNum - 1 : referenceNum
        switch (type) {
            case 'min':
                this.setState({ [name]: 0 }, () => this.setPage(name))
                break
            case 'max':
                this.setState({ [name]: max }, () => this.setPage(name))
                break
            case 'increase':
                if (this.state.initialMatch) {
                    this.setState({ initialMatch: false })
                    if (
                        this.state.currentPage !==
                        this.props.text.termLocations[0]
                    ) {
                        this.setState({ [name]: 0 }, () => this.setPage(name))
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
                    () => this.setPage(name)
                )
                break
            default:
                break
        }
    }

    handleMatches = () => {
        const { btnEnables, currentPage } = this.state
        const { termLocations, termOccurrences } = this.props.text

        let matches = termOccurrences > 1 ? 'matches' : 'match'
        let pages = termLocations.length > 1 ? 'pages' : 'page'

        let msg = `${termOccurrences} ${matches} found over ${termLocations.length} ${pages}.`
        let msgSupplement = null
        let btns = null
        if (termLocations.length === 1) {
            let disabledGoToBtn =
                termLocations[0] === currentPage ? 'disabled' : ''
            msgSupplement = (
                <span
                    className={`go-to-span ${disabledGoToBtn}`}
                    onClick={e => this.handleCounter('matchCount', 'min')}
                >
                    {`  GO TO MATCH ${termLocations[0]}`}
                </span>
            )
        } else {
            btns = (
                <React.Fragment>
                    <a
                        href="#!"
                        className="btn-flat"
                        disabled={btnEnables.disableMatchDec}
                        onClick={e =>
                            this.handleCounter(
                                'matchCount',
                                'decrease',
                                termLocations.length
                            )
                        }
                    >
                        PREV MATCH
                    </a>
                    <a
                        href="#!"
                        className="btn-flat"
                        disabled={btnEnables.disableMatchInc}
                        onClick={e =>
                            this.handleCounter(
                                'matchCount',
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
                    {msg}
                    {msgSupplement}
                </p>
                <span className="full-text-details">{btns}</span>
            </div>
        )
    }

    setUpCtls = renderedPageId => {
        const { btnEnables, matchCount, count } = this.state
        const { fulltext, termLocations } = this.props.text

        if (count <= 0) {
            btnEnables.disableMin = true
            btnEnables.disableDec = true
        } else {
            btnEnables.disableMin = false
            btnEnables.disableDec = false
        }

        if (count >= fulltext.length - 1) {
            btnEnables.disableMax = true
            btnEnables.disableInc = true
        } else {
            btnEnables.disableMax = false
            btnEnables.disableInc = false
        }

        if (matchCount <= 0) {
            btnEnables.disableMatchDec = true
        } else {
            btnEnables.disableMatchDec = false
        }

        if (matchCount >= termLocations.length - 1) {
            btnEnables.disableMatchInc = true
        } else {
            btnEnables.disableMatchInc = false
        }

        return (
            <div className="full-text-ctls">
                <a
                    href="#!"
                    disabled={btnEnables.disableMin}
                    className="btn-flat"
                    onClick={() => this.handleCounter('count', 'min')}
                >
                    <i className="fad fa-chevron-double-left" />
                </a>
                <a
                    href="#!"
                    disabled={btnEnables.disableDec}
                    className="btn-flat"
                    onClick={() =>
                        this.handleCounter('count', 'decrease', fulltext.length)
                    }
                >
                    <i className="fad fa-chevron-left" />
                </a>
                <a
                    href="#!"
                    disabled={btnEnables.disableInc}
                    className="btn-flat"
                    onClick={() =>
                        this.handleCounter('count', 'increase', fulltext.length)
                    }
                >
                    <i className="fad fa-chevron-right" />
                </a>
                <a
                    href="#!"
                    disabled={btnEnables.disableMax}
                    className="btn-flat"
                    onClick={() =>
                        this.handleCounter('count', 'max', fulltext.length)
                    }
                >
                    <i className="fad fa-chevron-double-right" />
                </a>
                <p className="full-text-pages">{renderedPageId}</p>
            </div>
        )
    }

    render() {
        if (!this.props.text || this.props.text.isFetching) {
            return null
        }

        const { fulltext, termLocations } = this.props.text
        const renderedPageId = this.state.currentPage || fulltext[0].id
        const selectedPage = this.selectedPage(renderedPageId)

        const paginationMsg = `Folios ${fulltext[0].id} to ${fulltext[fulltext.length - 1].id}.`

        return (
            <div className="card grey lighten-3">
                <div className="card-content blue-grey-text darken-4">
                    <p className="result-meta">{`This text has approximately ${fulltext.length} pages. ${paginationMsg}`}</p>
                    <div className="full-text-details">
                        <span className="full-text-details">
                            <i className="fad fa-arrow-right" /> Expandable
                            Details Pane (Coming Soon)
                        </span>
                    </div>
                    {termLocations.length && fulltext.length > 1
                        ? this.handleMatches()
                        : null}

                    {this.setUpCtls(renderedPageId)}
                    <div className="flow-text">
                        <p
                            className="full-text"
                            dangerouslySetInnerHTML={{
                                // __html: parseLines(selectedPage.data),
                                __html: selectedPage.data,
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
})

export default connect(mapStateToProps)(FullText)
