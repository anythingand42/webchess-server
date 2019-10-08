export const SIGN_UP_SET_MESSAGE = "SIGN_UP_SET_MESSAGE";
export const SIGN_UP_RESET = "SIGN_UP_RESET";

export const setMessage = (msg) => {
    return {
        type: SIGN_UP_SET_MESSAGE,
        payload: msg
    };
};

export const reset = () => {
    return {
        type: SIGN_UP_RESET
    };
};  