import '../assets/sass/search.scss'
import React from 'react'
import SearchPlusItem from './SearchPlusItem'

const handleDelete = () => {
    console.log('delete!')
}
export default ({ number }) => {
    if (number < 1) {
        return null
    }
    return Array.from(Array(number), (_, i) => i).map(input => {
        return <SearchPlusItem input={input} onDelete={handleDelete} />
    })
}
