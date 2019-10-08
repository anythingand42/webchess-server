export const LOG_IN = "LOG_IN";
export const LOG_IN_UNMOUNT = "LOG_IN_UNMOUNT";

export const logIn = (body) => {
    return {
        type: LOG_IN,
        payload: body
    };
};

export const handleUnmount = () => {
    return {
        type: LOG_IN_UNMOUNT
    };
};