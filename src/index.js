import 'materialize-css/dist/css/materialize.min.css'
import './assets/sass/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import configureStore from './store'

import * as serviceWorker from './serviceWorker'

const store = configureStore()

const Root = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <App className="container" />
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
