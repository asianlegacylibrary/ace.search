import _ from 'lodash'
import * as types from '../types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.ADD_RESULT_TO_FAVORITES:
            return { ...state, [action.payload._id]: action.payload }
        case types.DELETE_RESULT_FROM_FAVORITES:
            return _.omit(state, action.payload)
        default:
            return state
    }
}
