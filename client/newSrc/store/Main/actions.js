export const MAIN_SET_USER_NAME = "MAIN_SET_USER_NAME";

export const mainSetUserName = (userName) => {
    return {
        type: MAIN_SET_USER_NAME,
        payload: userName
    };
};