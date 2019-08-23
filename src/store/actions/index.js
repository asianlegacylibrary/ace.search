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

    if (offsetType !== 'all') {
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
    } catch (error) {
        dispatch({
            type: types.ERROR_SEARCH_RESULTS,
            payload: error.request.status,
        })
    }
}

export const fetchFullText = (term, id) => async dispatch => {
    dispatch({ type: types.REQUEST_FULL_TEXT })
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
        term,
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

export const setFullText = text => {
    return {
        type: types.SET_FULL_TEXT,
        payload: text,
    }
}
