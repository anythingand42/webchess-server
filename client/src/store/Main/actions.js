export const MAIN_SET_GAME_FLAG = "MAIN_SET_GAME_FLAG";
export const MAIN_RESET = "MAIN_RESET";

export const MAIN_SET_USER_NAME = "MAIN_SET_USER_NAME";
export const MAIN_SET_SOCKET_FLAG = "MAIN_SET_SOCKET_FLAG";

export const mainSetGameFlag = (isGameActive) => {
    return {
        type: MAIN_SET_GAME_FLAG,
        payload: isGameActive
    };
};

export const reset = () => {
    return {
        type: MAIN_RESET,
    };
};