import '../assets/sass/card.scss'
import React, { Component } from 'react'
import { CardDetails } from './CardDetails'
import { CardMain } from './CardMain'

export class Card extends Component {
    state = {
        activeClass: false,
    }

    handleClick = e => {
        e.preventDefault()
        this.setState({ activeClass: !this.state.activeClass })
    }

    render() {
        const activated = this.state.activeClass ? 'make-visible' : ''
        const { result, type } = this.props

        return (
            <React.Fragment>
                <div className="card-content blue-grey-text darken-4">
                    <div className="result-meta">
                        <span>ID: {result._id} </span>
                        <span>Score: {result._score}</span>
                    </div>
                    <CardMain type={type} result={result} />
                </div>
                <div className="card-action">
                    <a href="#!" onClick={e => this.handleClick(e)}>
                        {this.state.activeClass
                            ? 'Hide Details'
                            : 'Show Details'}
                    </a>
                    {/* <i class="fal fa-star" /> */}
                    <div
                        className={`more-content ${activated} blue-grey-text darken-4`}
                    >
                        <CardDetails source={result._source} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
