import {
    MAIN_SET_USER_NAME,
    MAIN_SET_GAME
} from "./actions";

const defaultState = {
    userName: null,
    game: null
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MAIN_SET_USER_NAME:
            return {
                ...state,
                options: action.payload
            };

        case MAIN_SET_GAME:
            return {
                ...state,
                game: action.payload
            };
        default:
            return state;
    }
};