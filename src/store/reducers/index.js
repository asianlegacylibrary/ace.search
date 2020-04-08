import { combineReducers } from 'redux'
import searchResults from './searchResults'
import getCollections from './getCollections'
import addTermToHistory from './addTermToHistory'
import setCurrentSearchTerm from './setCurrentSearchTerm'
import setSearchTypeDisplay from './setSearchTypeDisplay'
import setOffsets from './setOffsets'
import setFavorites from './setFavorites'
import setFullText from './setFullText'
import setCurrentSearchDefinition from './setCurrentSearchDefinition'
import setLimiters from './setLimiters'

export default combineReducers({
    currentSearchTerm: setCurrentSearchTerm,
    searchDefinition: setCurrentSearchDefinition,
    results: searchResults,
    collections: getCollections,
    history: addTermToHistory,
    searchTypeDisplay: setSearchTypeDisplay,
    offsets: setOffsets,
    limiters: setLimiters,
    favorites: setFavorites,
    selectedText: setFullText,
})
