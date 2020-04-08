import * as types from '../types'
// SEARCH RESULTS
export default (state = { texts: 0, catalogs: 0 }, action) => {
    switch (action.type) {
        case types.RESET_OFFSETS:
            return {
                texts: 0,
                catalogs: 0,
            }
        case types.SET_OFFSETS:
            return {
                ...state,
                [action.offsetType]: action.offset,
            }
        default:
            return state
    }
}
