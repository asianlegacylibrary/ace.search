import * as types from '../types'
import { statics } from '../../statics'
// SEARCH RESULTS

const createDataObj = (data, statics) => {
    let updatedCollection = []
    statics.filter((e) => {
        data.forEach((c) => {
            if (e.key === c.key) {
                updatedCollection.push({
                    key: c.key,
                    doc_count: c.doc_count,
                    name: e.name,
                    filter: {
                        term: { collection: `${c.key}` },
                    },
                })
            }
        })
    })

    return updatedCollection
}

export default (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_COLLECTIONS:
            return { ...state, isFetching: true }
        case types.RECEIVE_COLLECTIONS:
            const { data } = action.payload
            const { texts, catalogs } = statics.collections
            let textBuckets = data.textResults.aggregations.collections.buckets
            let catalogBuckets =
                data.catalogResults.aggregations.collections.buckets
            let updatedTextCollections = createDataObj(textBuckets, texts)
            let updatedCatalogCollections = createDataObj(
                catalogBuckets,
                catalogs
            )

            return {
                ...state,
                isFetching: false,
                error: false,
                errorStatus: null,
                texts: {
                    data: updatedTextCollections,
                    totalDocs: action.payload.data.textResults.hits.total,
                },
                catalogs: {
                    data: updatedCatalogCollections,
                    totalDocs: action.payload.data.catalogResults.hits.total,
                },
                filters: {
                    texts: updatedTextCollections.reduce((acc, obj) => {
                        acc.push(obj.filter)
                        return acc
                    }, []),
                    catalogs: updatedCatalogCollections.reduce((acc, obj) => {
                        acc.push(obj.filter)
                        return acc
                    }, []),
                },
            }
        case types.SET_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.filterType]: action.filter,
                },
            }
        case types.ERROR_COLLECTIONS:
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
