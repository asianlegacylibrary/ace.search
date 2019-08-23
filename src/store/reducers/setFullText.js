import * as types from '../types'

// SEARCH RESULTS
export default (state = null, action) => {
    switch (action.type) {
        case types.REQUEST_FULL_TEXT:
            return { ...state, isFetching: true }
        case types.SET_FULL_TEXT_DETAILS:
            return { ...state, details: action.details }
        case types.RECEIVE_FULL_TEXT:
            return { ...state, fulltext: action.fulltext, isFetching: false }
        case types.DELETE_FULL_TEXT:
            return null
        case types.ERROR_FULL_TEXT:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorStatus: action.payload,
            }
        default:
            return state
    }
}
