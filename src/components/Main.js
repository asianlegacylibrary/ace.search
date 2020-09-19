import React from 'react'
import '../assets/sass/main.scss'

import SearchHits from './SearchHits'
import SearchForm from './SearchForm'

export default () => {
    return (
        <main>
            <div className="container">
                <i className="absolute-diamond fa fa-dagger fa-rotate-180 fa-10x" />
                <SearchForm />
                <SearchHits />
            </div>
        </main>
    )
}
