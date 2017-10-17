'use strict';

import { SERVER_VERSION } from '../actions/types';

const initialState = {
    user: null,
    serverVersion: '',
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST':
            return {
                ...state,
                requesting: true,
            };

        case SERVER_VERSION:
            return {
                ...state,
                serverVersion: action.payload && action.payload.serverVersion,
                requesting: false,
            }

        case 'FAILURE':
            return {
                ...state,
                requesting: false,
            };

        default:
        {
            /* Return original state if no actions were consumed. */
            return state;
        }
    }
};