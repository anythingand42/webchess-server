import {
    MAIN_SET_USER_NAME
} from "./actions";

const defaultState = {
    userName: null
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MAIN_SET_USER_NAME:
            return {
                ...state,
                options: action.payload
            };
        default:
            return state;
    }
};