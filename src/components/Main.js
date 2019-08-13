import React from 'react'
import '../assets/sass/main.scss'

import SearchHits from './SearchHits'
import SearchForm from './SearchForm'

export default () => {
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="search-bar">
                        <SearchForm />
                    </div>
                </div>
                <div className="row">
                    <div className="search-results">
                        <SearchHits />
                    </div>
                </div>
            </div>
        </main>
    )
}
