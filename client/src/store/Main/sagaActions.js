export const MAIN_FETCH_INITIAL_STATE = "MAIN_FETCH_INITIAL_STATE";
export const LOG_OUT = "LOG_OUT";

export const fetchInitialState = () => {
    return {
        type: MAIN_FETCH_INITIAL_STATE
    };
};

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};