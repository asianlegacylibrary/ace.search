import { combineReducers } from 'redux'
import searchResultsReducer from './searchResultsReducer'
import addTermToHistoryReducer from './addTermToHistory'
import setSearchTypeDisplay from './setSearchTypeDisplay'
import setOffsets from './setOffsets'
import setFavorites from './setFavorites'

// REDUCERS

// FAVORITES

export default combineReducers({
    results: searchResultsReducer,
    history: addTermToHistoryReducer,
    searchTypeDisplay: setSearchTypeDisplay,
    offsets: setOffsets,
    favorites: setFavorites,
})
