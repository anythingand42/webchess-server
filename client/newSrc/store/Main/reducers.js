import {
    MAIN_SET_GAME,
    MAIN_RESET
} from "./actions";

const defaultState = {
    game: null
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MAIN_SET_GAME:
            return {
                ...state,
                game: action.payload
            };

        case MAIN_RESET:
            return defaultState;
            
        default:
            return state;
    }
};