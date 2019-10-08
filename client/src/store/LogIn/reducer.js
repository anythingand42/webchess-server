import {
    LOG_IN_SET_MESSAGE,
    LOG_IN_RESET
} from "./actions";


const defaultState = {
    message: null
};

export const logInReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_IN_SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case LOG_IN_RESET:
                return defaultState;
            
        default:
            return state;
    }
};