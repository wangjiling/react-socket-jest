import { method_server_version } from '../constants'
import { SERVER_VERSION } from './types'
import { reqBase, fetchBase } from './base'

//server version
const serverVersion = () => reqBase({
    method: method_server_version,
    params: [],
    successType: SERVER_VERSION,
    successCb: json => ({serverVersion: json.result})
});

export const getServerVersion = () => dispatch => {
    return dispatch(serverVersion());
};