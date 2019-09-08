import {
    SET_CHALLENGES_SEARCH_OPPONENT,
    SET_CAN_CLICK_SEARCH_OPPONENT
} from "./actions.js"

const defaultState = {
    challenges: null,
    canClick: true
};

export const searchOpponentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CHALLENGES_SEARCH_OPPONENT:
            return {
                ...state,
                challenges: action.payload
            };

        case SET_CAN_CLICK_SEARCH_OPPONENT:
            return {
                ...state,
                canClick: action.payload
            };

        default:
            return state;
    }
};