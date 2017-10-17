import { browserHistory } from 'react-router'
import { method_server_version } from '../constants'
import { serialize } from '../constants/util'
import { SERVER_VERSION, SEND, SEND_SUCCESS, SEND_FAIL } from './types'
import { socketBase } from './base'

//server version
const socketMessage = () => socketBase({
    method: method_server_version,
    params: [],
    successType: SEND_SUCCESS,
    successCb: data => {
        console.log(data)
        return {serverVersion: data.result}
    },
    event: 'message',
});

export const getSocketMessage = () => dispatch => {
    return dispatch(socketMessage());
};