import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import SocketClient from './SocketClient'
import configure from './store'
import App from './containers/App'

import Home from './components/Home'

const socketClient = new SocketClient();
const store = configure({}, socketClient, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="/home" />
                <Route path="/home" component={Home}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
