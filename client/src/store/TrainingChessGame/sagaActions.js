export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_UNMOUNT = "SIGN_UP_UNMOUNT";

export const signUp = (body) => {
    return {
        type: SIGN_UP,
        payload: body
    };
};

export const handleUnmount = () => {
    return {
        type: SIGN_UP_UNMOUNT
    };
};