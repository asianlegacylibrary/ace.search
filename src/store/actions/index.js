import expressURL from '../apis/express'
import * as types from '../types'
//import { groupBy } from '../utilities'

// ACTIONS CREATORS
// if needed you can check current state in action creator (getState()) before continuing
// if additional logic required around dispatching action

export const fetchResults = (
    term,
    offset,
    offsetType = 'all'
) => async dispatch => {
    let searchURL = '/search'
    let def = term

    console.log('fetch with term', term)
    if (offsetType === 'all') {
        //def = groupBy(term, 'operator', 'term')
        //term = def['PRIMARY'][0]
        //console.log(def, term)
        dispatch({ type: types.SET_CURRENT_SEARCH_TERM, payload: term })
        dispatch({
            type: types.SET_CURRENT_SEARCH_DEFINITION,
            payload: def ? def : term,
        })
    }
    if (offsetType === 'catalogs') {
        searchURL = '/search/catalogs'
        // def = term
        // term = def['PRIMARY'][0]
        // console.log(def, term)
    } else if (offsetType === 'texts') {
        searchURL = 'search/texts'
        // def = term
        // term = def['PRIMARY'][0]
        // console.log(def, term)
    }

    dispatch({ type: types.REQUEST_SEARCH_RESULTS })

    if (offsetType !== 'all') {
        dispatch({ type: types.SET_OFFSETS, offsetType, offset })
    }

    try {
        const response = await expressURL.get(searchURL, {
            params: { term, def, offset },
        })

        if (offsetType === 'all') {
            dispatch({
                type: types.RECEIVE_SEARCH_RESULTS,
                payload: response.data,
            })
        } else if (offsetType === 'catalogs') {
            dispatch({ type: types.RECEIVE_CATALOGS, payload: response.data })
        } else if (offsetType === 'texts') {
            dispatch({ type: types.RECEIVE_TEXTS, payload: response.data })
        }
    } catch (error) {
        dispatch({
            type: types.ERROR_SEARCH_RESULTS,
            payload: error,
        })
    }
}

export const fetchFullText = (term, def = null, result) => async dispatch => {
    const getURL = `search/text/${result._id}`
    dispatch({ type: types.REQUEST_FULL_TEXT })
    dispatch({ type: types.SET_FULL_TEXT_DETAILS, details: result })
    try {
        const response = await expressURL.get(getURL, {
            params: { term, def },
        })

        console.log('full text resp', response.data, def)

        dispatch({
            type: types.RECEIVE_FULL_TEXT,
            fulltext: response.data.hits[0].highlight.tibtext,
            definition: def,
            term: term,
        })
    } catch (error) {
        dispatch({
            type: types.ERROR_FULL_TEXT,
            payload: error,
        })
    }
}

export const addToFavorites = result => {
    return {
        type: types.ADD_RESULT_TO_FAVORITES,
        payload: result,
    }
}
export const removeFromFavorites = id => {
    return { type: types.DELETE_RESULT_FROM_FAVORITES, payload: id }
}

export const addTermToHistory = term => {
    // look into how to terminate action based on cache
    //if (!store.getState().history.includes(term)) {
    return {
        type: types.ADD_TERM_TO_HISTORY,
        term,
    }
    //}
}

export const setCurrentSearchTerm = term => {
    return {
        type: types.SET_CURRENT_SEARCH_TERM,
        payload: term,
    }
}

export const setCurrentSearchDefinition = definition => {
    return {
        type: types.SET_CURRENT_SEARCH_DEFINITION,
        payload: definition,
    }
}

export const setSearchTypeDisplay = menuItem => {
    return {
        type: types.SET_SEARCH_TYPE_DISPLAY,
        payload: menuItem,
    }
}

export const setOffsets = (offsetType, offset) => {
    return {
        type: types.SET_OFFSETS,
        offsetType,
        offset,
    }
}

export const resetOffsets = () => {
    return {
        type: types.RESET_OFFSETS,
    }
}

export const clearResults = () => {
    return {
        type: types.CLEAR_RESULTS,
    }
}

export const setFullTextDetails = details => {
    return {
        type: types.SET_FULL_TEXT_DETAILS,
        details,
    }
}

export const deleteFullText = () => {
    return { type: types.DELETE_FULL_TEXT }
}
