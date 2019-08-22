import * as types from '../types'

// SEARCH RESULTS
export default (state = '', action) => {
    switch (action.type) {
        case types.SET_CURRENT_SEARCH_TERM:
            return action.term
        default:
            return state
    }
}
