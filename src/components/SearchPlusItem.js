import React from 'react'
export default ({ input, onDelete }) => {
    return (
        <div key={input} className="new-input-row">
            <input className="new-input" />
            <button className="btn-flat" onClick={onDelete}>
                <i className="right fad fa-trash new-input-icon" />
            </button>
        </div>
    )
}
