import {
    MAIN_SET_GAME_FLAG,
    MAIN_SET_USER_NAME,
    MAIN_SET_SOCKET_FLAG,
    MAIN_RESET
} from "./actions";


const defaultState = {
    isGameActive: false,
    userName: null,
    isSocketConnected: false
};

export const mainReducer = (state = defaultState, action) => {
    console.log(action);
    switch (action.type) {
        case MAIN_SET_SOCKET_FLAG:
            return {
                ...state,
                isSocketConnected: action.payload
            };

        case MAIN_SET_GAME_FLAG:
            return {
                ...state,
                isGameActive: action.payload
            };

        case MAIN_SET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            };

        case MAIN_RESET:
            return defaultState;
            
        default:
            return state;
    }
};