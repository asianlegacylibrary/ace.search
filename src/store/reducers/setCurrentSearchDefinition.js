import * as types from '../types'
import { groupBy } from '../utilities'

// SEARCH RESULTS
export default (state = {}, action) => {
    switch (action.type) {
        case types.SET_CURRENT_SEARCH_DEFINITION:
            return action.payload
        default:
            return state
    }
}
