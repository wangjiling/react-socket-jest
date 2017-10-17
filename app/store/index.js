import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware, push } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk'
import { logger, socket } from '../middleware'
import rootReducer from '../reducers'


export default function configure(initialState, socketClient, browserHistory) {
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore

    const middleware = [thunk, logger, apiMiddleware, socket(socketClient), routerMiddleware(browserHistory)]

    const createStoreWithMiddleware = applyMiddleware(
        ...middleware
    )(create)

    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
