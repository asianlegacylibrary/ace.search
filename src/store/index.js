import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import monitorReducersEnhancer from './enhancers'
import reducers from './reducers'

export default function configureStore(preloadedState) {
    let middlewares = []
    let enhancers = []

    middlewares.push(thunkMiddleware)

    if (process.env.NODE_ENV === 'development') {
        const loggerMiddleware = createLogger()
        middlewares.push(loggerMiddleware)
        enhancers.push(monitorReducersEnhancer)
    }

    const middlewareEnhancer = applyMiddleware(...middlewares)

    enhancers.push(middlewareEnhancer)
    const composedEnhancers = compose(...enhancers)

    const store = createStore(reducers, preloadedState, composedEnhancers)

    return store
}
