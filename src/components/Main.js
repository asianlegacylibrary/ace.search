import React from 'react'
import '../assets/sass/main.scss'

import SearchHits from './SearchHits'
import SearchForm from './SearchForm'

export default () => {
    return (
        <main>
            <div className="container">
                <SearchForm />
                <SearchHits />
            </div>
        </main>
    )
}
