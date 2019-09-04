import * as types from '../types'
// SEARCH RESULTS
export default (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SEARCH_RESULTS:
            return { ...state, isFetching: true }
        case types.RECEIVE_SEARCH_RESULTS:
            return {
                ...state,
                isFetching: false,
                catalogs: action.payload.catalogs.hits,
                texts: action.payload.texts.hits,
            }
        case types.RECEIVE_CATALOGS:
            return {
                ...state,
                isFetching: false,
                catalogs: action.payload.hits,
            }
        case types.RECEIVE_TEXTS:
            return {
                ...state,
                isFetching: false,
                texts: action.payload.hits,
            }
        case types.ERROR_SEARCH_RESULTS:
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
