import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

export default function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware]

    if (process.env.NODE_ENV === 'development') {
        const loggerMiddleware = createLogger()
        middlewares.push(loggerMiddleware)
    }

    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

    const store = createStore(reducers, preloadedState, composedEnhancers)

    return store
}
