'use strict';

import { SEND, SEND_SUCCESS, SEND_FAIL } from '../actions/types';

const initialState = {
    socketServerVersion: '',
};

export const socket = (state = initialState, action) => {
    switch(action.type) {
        case SEND: {
            return {
                ...state,
                isSending: true,
            };
        }
        case SEND_SUCCESS: {
            return {
                ...state,
                socketServerVersion: JSON.parse(action.result).result,
            };
        }
        default: {
            return state;
        }
    }
};
