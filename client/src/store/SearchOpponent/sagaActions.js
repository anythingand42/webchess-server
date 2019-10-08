export const SEARCH_OPPONENT_FETCH_INITIAL_STATE = "SEARCH_OPPONENT_FETCH_INITIAL_STATE";
export const ADD_CHALLENGE = "ADD_CHALLENGE";
export const REMOVE_CHALLENGE = "REMOVE_CHALLENGE";
export const SEARCH_OPPONENT_UNMOUNT = "SEARCH_OPPONENT_UNMOUNT";

export const fetchInitialState = () => {
    return {
        type: SEARCH_OPPONENT_FETCH_INITIAL_STATE
    };
};

export const addChallenge = (time) => {
    return {
        type: ADD_CHALLENGE,
        payload: time
    };
};

export const removeChallenge = (time) => {
    return {
        type: REMOVE_CHALLENGE,
        payload: time
    };
};

export const handleUnmount = () => {
    return {
        type: SEARCH_OPPONENT_UNMOUNT
    };
};