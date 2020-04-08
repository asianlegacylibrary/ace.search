import React, { Component } from 'react'

export class Link extends Component {
    state = {
        active: false,
    }

    render() {
        const { linkName } = this.props
        return (
            <li className="tab col s3">
                <a
                    className={this.state.active ? `active ${linkName}` : ''}
                    onClick={e => this.handleClick(linkName, e)}
                    href="#!"
                >
                    {linkName}
                </a>
            </li>
        )
    }
}
