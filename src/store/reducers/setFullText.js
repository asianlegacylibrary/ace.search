import * as types from '../types'
import { getPagesAndCounts } from '../utilities'

// SEARCH RESULTS
export default (state = null, action) => {
    let highlight = false
    let pages
    let count
    switch (action.type) {
        case types.REQUEST_FULL_TEXT:
            return { ...state, isFetching: true }
        case types.SET_FULL_TEXT_DETAILS:
            ;({ pages, count } = getPagesAndCounts(
                action.details._source.tibtext,
                highlight
            ))

            return {
                ...state,
                details: action.details,
                fulltext: pages,
                termOccurrences: count,
                termLocations: [],
            }
        case types.RECEIVE_FULL_TEXT:
            // rewrite HIGHLIGHT tags to highlight full phrase
            // then split fulltext into pages
            ;({ pages, count } = getPagesAndCounts(
                action.fulltext[0],
                (highlight = true)
            ))

            // if (count > 0) {
            //     count = Math.round(count / selectedDefinitionCount)
            // }

            // create array of term locations
            let termLocs = pages.reduce((acc, cur, i) => {
                if (cur.termMatch) {
                    acc.push(i)
                }
                return acc
            }, [])

            return {
                ...state,
                fulltext: pages,
                termLocations: termLocs,
                //term: action.term,
                definition: action.definition,
                termOccurrences: count,
                isFetching: false,
            }
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
