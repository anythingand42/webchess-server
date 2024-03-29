export const ONLINE_CHESS_GAME_MOUNT = "ONLINE_CHESS_GAME_MOUNT";
export const ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD = "ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD";
export const ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD = "ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD";
export const ONLINE_CHESS_GAME_MOUSE_LEAVE_FROM_BOARD = "ONLINE_CHESS_GAME_MOUSE_LEAVE_FROM_BOARD";
export const ONLINE_CHESS_GAME_WHITE_TIME_OUT = "ONLINE_CHESS_GAME_WHITE_TIME_OUT";
export const ONLINE_CHESS_GAME_BLACK_TIME_OUT = "ONLINE_CHESS_GAME_BLACK_TIME_OUT";
export const ONLINE_CHESS_GAME_UNMOUNT = "ONLINE_CHESS_GAME_UNMOUNT";
export const ONLINE_CHESS_GAME_CHAT_SUBMIT = "ONLINE_CHESS_GAME_CHAT_SUBMIT";
export const ONLINE_CHESS_GAME_RESIGN = "ONLINE_CHESS_GAME_RESIGN";


export const handleMount = () => {
    return {
        type: ONLINE_CHESS_GAME_MOUNT
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

export const handleMouseLeaveFromBoard = () => {
    return {
        type: ONLINE_CHESS_GAME_MOUSE_LEAVE_FROM_BOARD
    };
};

export const whiteTimerHandleTimeOut = () => {
    return {
        type: ONLINE_CHESS_GAME_WHITE_TIME_OUT
    };
};

export const blackTimerHandleTimeOut = () => {
    return {
        type: ONLINE_CHESS_GAME_BLACK_TIME_OUT
    };
};

export const handleUnmount = () => {
    return {
        type: ONLINE_CHESS_GAME_UNMOUNT
    };
};

export const chatHandleSubmit = (msg) => {
    return {
        type: ONLINE_CHESS_GAME_CHAT_SUBMIT,
        payload: msg
    };
};

export const handleResign = () => {
    return {
        type: ONLINE_CHESS_GAME_RESIGN
    };
};