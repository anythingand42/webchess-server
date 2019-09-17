export const MAIN_SET_USER_NAME = "MAIN_SET_USER_NAME";
export const MAIN_SET_GAME = "MAIN_SET_GAME";

export const mainSetUserName = (userName) => {
    return {
        type: MAIN_SET_USER_NAME,
        payload: userName
    };
};

export const mainSetGame = (game) => {
    return {
        type: MAIN_SET_GAME,
        payload: game
    };
};