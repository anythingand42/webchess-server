import {
    SEARCH_BUTTON_SET_AVAILABILITY,
    SEARCH_BUTTON_SET_PRESSED,
    LOBBY_SET_CHALLENGES,
    SEARCH_OPPONENT_RESET
} from "./actions.js"

const defaultState = {
    challenges: null,
    buttons: {
        "1+0": {
            isAvailable: true,
            isPressed: false
        },
        "1+1": {
            isAvailable: true,
            isPressed: false
        },
        "2+1": {
            isAvailable: true,
            isPressed: false
        },
        "3+0": {
            isAvailable: true,
            isPressed: false
        },
        "3+2": {
            isAvailable: true,
            isPressed: false
        },
        "5+3": {
            isAvailable: true,
            isPressed: false
        }
    }
};

export const searchOpponentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_BUTTON_SET_AVAILABILITY:
            return {
                ...state,
                buttons: {
                    ...state.buttons,
                    [action.payload.buttonName]: {
                        ...state.buttons[action.payload.buttonName],
                        isAvailable: action.payload.isAvailable
                    }
                }
            };
        case SEARCH_BUTTON_SET_PRESSED:
            return {
                ...state,
                buttons: {
                    ...state.buttons,
                    [action.payload.buttonName]: {
                        ...state.buttons[action.payload.buttonName],
                        isPressed: action.payload.isPressed
                    }
                }
            };
        case LOBBY_SET_CHALLENGES:
            return {
                ...state,
                challenges: action.payload
            };

        case SEARCH_OPPONENT_RESET:
            return defaultState;

        default:
            return state;
    }
};