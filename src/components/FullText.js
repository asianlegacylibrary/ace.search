import React, { Component } from 'react'
import { connect } from 'react-redux'

class FullText extends Component {
    render() {
        const { text } = this.props
        const { tibtext, titletib } = text._source
        return (
            <div className="card grey lighten-3">
                <div className="card-content blue-grey-text darken-4">
                    NOTE: Formatting is on the way!
                    <p className="author-item flow-text">
                        <span className="span-title">{titletib}</span>
                    </p>
                    <p className="flow-text">{tibtext}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.selectedText,
})

export default connect(mapStateToProps)(FullText)
