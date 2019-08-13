import expressURL from '../apis/express'
import * as types from '../types'

// ACTIONS CREATORS
// if needed you can check current state in action creator (getState()) before continuing
// if additional logic required around dispatching action

export const fetchResults = (
    term,
    offset,
    offsetType = 'all'
) => async dispatch => {
    let searchURL = '/search'
    if (offsetType === 'catalogs') {
        searchURL = '/search/catalogs'
    } else if (offsetType === 'texts') {
        searchURL = 'search/texts'
    }

    dispatch({ type: types.REQUEST_SEARCH_RESULTS })

    if (offsetType === 'all') {
        dispatch({ type: types.RESET_OFFSETS })
    } else {
        dispatch({ type: types.SET_OFFSETS, offsetType, offset })
    }

    try {
        const response = await expressURL.get(searchURL, {
            params: { term, offset },
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
        dispatch({ type: types.ADD_TERM_TO_HISTORY, payload: term })
    } catch (error) {
        dispatch({
            type: types.ERROR_SEARCH_RESULTS,
            payload: error.request.status,
        })
    }
}

// Using Thunk, we can define a function to return a function
export const fetchSearchResults = (
    term,
    offset,
    type = 'all'
) => async dispatch => {
    let searchURL = '/search'
    if (type === 'catalogs') {
        searchURL = '/search/catalogs'
    } else if (type === 'texts') {
        searchURL = 'search/texts'
    }
    dispatch({ type: types.REQUEST_SEARCH_RESULTS })
    try {
        const response = await expressURL.get(searchURL, {
            params: {
                term,
                offset,
            },
        })
        dispatch({ type: types.RECEIVE_SEARCH_RESULTS, payload: response.data })
    } catch (error) {
        dispatch({
            type: types.ERROR_SEARCH_RESULTS,
            payload: error.request.status,
        })
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
