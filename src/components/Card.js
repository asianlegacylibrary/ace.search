import '../assets/sass/card.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardDetails from './CardDetails'
import CardMain from './CardMain'
import * as types from '../store/types'

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

    handleFavorites = (result, e) => {
        e.preventDefault()

        this.setState({ activeFavorite: !this.state.activeFavorite }, () => {
            if (this.state.activeFavorite) {
                console.log('adding', result._id)
                this.props.dispatch({
                    type: types.ADD_RESULT_TO_FAVORITES,
                    payload: result,
                })
            } else {
                console.log('removing', result._id)
                this.props.dispatch({
                    type: types.DELETE_RESULT_FROM_FAVORITES,
                    payload: result._id,
                })
            }
        })
    }

    render() {
        const activatedDetails = this.state.activeDetails ? 'make-visible' : ''
        const activatedFavorite = this.state.activeFavorite
            ? 'favorites-active'
            : 'favorites'
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
                    <a href="#!" onClick={e => this.handleDetails(e)}>
                        {this.state.activeDetails
                            ? 'Hide Details'
                            : 'Show Details'}
                    </a>
                    <div className="favorites">
                        <i
                            key={result._id}
                            className={`fal fa-star ${activatedFavorite}`}
                            onClick={e => this.handleFavorites(result, e)}
                        />
                    </div>

                    <div
                        key={result._id}
                        className={`more-content ${activatedDetails} blue-grey-text darken-4`}
                    >
                        <CardDetails source={result._source} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites,
})

export default connect(mapStateToProps)(Card)
