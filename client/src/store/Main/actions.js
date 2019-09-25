export const MAIN_SET_GAME = "MAIN_SET_GAME";
export const MAIN_RESET = "MAIN_RESET";

export const mainSetGame = (game) => {
    return {
        type: MAIN_SET_GAME,
        payload: game
    };
};

export const reset = () => {
    return {
        type: MAIN_RESET,
    };
};