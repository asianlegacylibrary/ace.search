import { combineReducers } from 'redux'
import searchResults from './searchResults'
import addTermToHistory from './addTermToHistory'
import setSearchTypeDisplay from './setSearchTypeDisplay'
import setOffsets from './setOffsets'
import setFavorites from './setFavorites'
import setFullText from './setFullText'

export default combineReducers({
    results: searchResults,
    history: addTermToHistory,
    searchTypeDisplay: setSearchTypeDisplay,
    offsets: setOffsets,
    favorites: setFavorites,
    selectedText: setFullText,
})
