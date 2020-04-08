import React from 'react'
export default ({ type = 'checkbox', id, checked = true, onChange }) => (
    <input
        type={type}
        id={id}
        checked={checked}
        onChange={onChange}
        className="filled-in"
    />
)
