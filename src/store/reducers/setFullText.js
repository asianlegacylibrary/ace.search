import * as types from '../types'
import { createPages } from '../utilities'

// SEARCH RESULTS
export default (state = null, action) => {
    let pages
    switch (action.type) {
        case types.REQUEST_FULL_TEXT:
            return { ...state, isFetching: true }
        case types.SET_FULL_TEXT_DETAILS:
            pages = createPages(action.details._source.tibtext)
            return {
                ...state,
                details: action.details,
                fulltext: pages,
                termOccurrences: 0,
                termLocations: [],
            }
        case types.RECEIVE_FULL_TEXT:
            // split fulltext into pages
            pages = createPages(action.fulltext[0])

            // get count of term occurrences in full-text
            let count = (action.fulltext[0].match(/<em/g) || []).length

            if (count > 0) {
                count = Math.round(
                    count / action.term.trim().split(/\s+/).length
                )
            }

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
                term: action.term,
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
