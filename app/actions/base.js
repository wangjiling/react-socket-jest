import { CALL_API } from 'redux-api-middleware';
import { browserHistory } from 'react-router';
import { REQUEST, FAILURE, SEND, SEND_SUCCESS, SEND_FAIL } from './types';
import { host, socket_host } from '../constants';

const getSuccessType = (successType, successCb) => {
    const payload = (action, state, res) => {
        const currentContentType = res.headers.get('Content-Type');
        if (currentContentType && currentContentType.indexOf('json') !== -1) {
            return res.json().then(
                (json) => {
                    return successCb(json);
                },
            );
        }
        return null;
    };
    return {
        payload,
        type: successType,
    };
};

const getFailType = () => ({
    type: FAILURE,
    meta: (action, state, res) => {
        if (res) {
            return {
                status: res.status,
                statusText: res.statusText,
            };
        }
        return {
            status: -1,
            statusText: 'Network request failed',
        };
    },
});

export const reqBase = (args) => {
    const { method, params, successType, successCb, requestToast } = args;
    const body = {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
    };
    let headers = args.headers;
    const types = [requestToast || REQUEST, getSuccessType(successType, successCb), getFailType()];

    if (!headers) {
        headers = {
            'Content-Type': 'application/json',
        };
    }

    return {
        [CALL_API]: {endpoint: host, method: 'POST', headers, body: JSON.stringify(body), types, credentials: 'include' },
    };
};

export const fetchBase = (args) => {
    const { method, params, successCb } = args;
    const body = {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
    };
    fetch(host, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.indexOf('json') !== -1) {
            successCb(res.json());
        }
    });
};

export const socketBase = (args) => {
    const { method, params, successType, successCb, event } = args;
    const body = {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
    };

    return {
        type: 'socket',
        types: [SEND, successType, SEND_FAIL],
        promise: (socket) => {
            if(!socket.socket) socket.connect();
            return socket.emit(event, JSON.stringify(body));
        }
    }
}

