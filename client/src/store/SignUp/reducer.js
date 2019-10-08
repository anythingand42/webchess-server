import {
    SIGN_UP_SET_MESSAGE,
    SIGN_UP_RESET
} from "./actions";


const defaultState = {
    message: null
};

export const signUpReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SIGN_UP_SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case SIGN_UP_RESET:
                return defaultState;
            
        default:
            return state;
    }
};