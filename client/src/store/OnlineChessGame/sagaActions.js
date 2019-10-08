export const ONLINE_CHESS_GAME_FETCH_INITIAL_STATE = "ONLINE_CHESS_GAME_FETCH_INITIAL_STATE";
export const ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD = "ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD";
export const ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD = "ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD";
export const ONLINE_CHESS_GAME_UNMOUNT = "ONLINE_CHESS_GAME_UNMOUNT";

export const fetchInitialState = () => {
    return {
        type: ONLINE_CHESS_GAME_FETCH_INITIAL_STATE
    };
};

export const handleMouseDownOnBoard = (id, clientX, clientY) => {
    return {
        type: ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD,
        payload: {id, clientX, clientY}
    };
};

export const handleMouseUpOnBoard = (id) => {
    return {
        type: ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD,
        payload: id
    };
};

export const handleUnmount = () => {
    return {
        type: ONLINE_CHESS_GAME_UNMOUNT
    };
};