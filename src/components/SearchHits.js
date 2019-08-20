import '../assets/sass/search.scss'
import React from 'react'

import SearchHitsMenu from './SearchHitsMenu'
import SearchHitsResults from './SearchHitsResults'

export default () => {
    return (
        <div className="row">
            <SearchHitsMenu />
            <SearchHitsResults />
        </div>
    )
}
