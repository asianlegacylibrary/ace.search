import * as types from '../types'
import produce from 'immer'
import { statics } from '../../statics'

const { limiters } = statics

export default (state = limiters, action) =>
    produce(state, (draft) => {
        const { entityType, limiterType, limiter } = action
        switch (action.type) {
            case types.SET_LIMITER: {
                draft[entityType][limiterType].on = limiter
            }
            // no default
        }
    })
