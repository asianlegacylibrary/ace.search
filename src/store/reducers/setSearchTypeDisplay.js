import * as types from '../types'
// SEARCH RESULTS
export default (state = 'catalogs', action) => {
    switch (action.type) {
        case types.SET_SEARCH_TYPE_DISPLAY:
            return action.payload
        default:
            return state
    }
}
