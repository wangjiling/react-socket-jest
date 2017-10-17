import { TOAST_SHOW, SERVER_VERSION } from '../actions/types';

const initialState = {
    tdShow: false,//toast dialog
    tdContent: '',
};

export const common = (state = initialState, action) => {
    switch (action.type) {
        case TOAST_SHOW:
            return {
                ...state,
                tdShow: true,
                tdContent: action.meta.tdContent
            };

        case SERVER_VERSION:
            return {
                ...state,
                tdShow: false,
                tdContent: '',
            };
        default:
        {
            /* Return original state if no actions were consumed. */
            return state;
        }
    }
};