import { combineReducers } from 'redux'
import searchResults from './searchResults'
import addTermToHistory from './addTermToHistory'
import setCurrentSearchTerm from './setCurrentSearchTerm'
import setSearchTypeDisplay from './setSearchTypeDisplay'
import setOffsets from './setOffsets'
import setFavorites from './setFavorites'
import setFullText from './setFullText'
import setCurrentSearchDefinition from './setCurrentSearchDefinition'

export default combineReducers({
    currentSearchTerm: setCurrentSearchTerm,
    searchDefinition: setCurrentSearchDefinition,
    results: searchResults,
    history: addTermToHistory,
    searchTypeDisplay: setSearchTypeDisplay,
    offsets: setOffsets,
    favorites: setFavorites,
    selectedText: setFullText,
})
