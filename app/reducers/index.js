import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { common } from './common'
import { user } from './user'
import { socket } from './socket'

export default combineReducers({
    routing,
    form,
    common,
    user,
    socket,
})
