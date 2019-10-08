export const ONLINE_CHESS_GAME_SET_DRAGGED_PIECE = "ONLINE_CHESS_GAME_SET_DRAGGED_PIECE";
export const ONLINE_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT = "ONLINE_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT";
export const ONLINE_CHESS_GAME_SET_PGN = "ONLINE_CHESS_GAME_SET_PGN";
export const ONLINE_CHESS_GAME_SET_FEN = "ONLINE_CHESS_GAME_SET_FEN";
export const ONLINE_CHESS_GAME_SET_ORIENTATION = "ONLINE_CHESS_GAME_SET_ORIENTATION";
export const ONLINE_CHESS_GAME_SET_RESULT = "ONLINE_CHESS_GAME_SET_RESULT";
export const ONLINE_CHESS_GAME_SET_IS_ACTIVE = "ONLINE_CHESS_GAME_SET_IS_ACTIVE";
export const ONLINE_CHESS_GAME_RESET = "ONLINE_CHESS_GAME_RESET";
export const ONLINE_CHESS_GAME_SET_WHITE_USER_NAME = "ONLINE_CHESS_GAME_SET_WHITE_USER_NAME";
export const ONLINE_CHESS_GAME_SET_BLACK_USER_NAME = "ONLINE_CHESS_GAME_SET_BLACK_USER_NAME";
export const ONLINE_CHESS_GAME_SET_WHITE_REST_OF_TIME = "ONLINE_CHESS_GAME_SET_WHITE_REST_OF_TIME";
export const ONLINE_CHESS_GAME_SET_BLACK_REST_OF_TIME = "ONLINE_CHESS_GAME_SET_BLACK_REST_OF_TIME";
export const ONLINE_CHESS_GAME_SET_WHITE_TIMER_START_DATE = "ONLINE_CHESS_GAME_SET_WHITE_TIMER_START_DATE";
export const ONLINE_CHESS_GAME_SET_BLACK_TIMER_START_DATE = "ONLINE_CHESS_GAME_SET_BLACK_TIMER_START_DATE";
export const ONLINE_CHESS_GAME_SET_START_CLOCK_FLAG = "ONLINE_CHESS_GAME_SET_START_CLOCK_FLAG";
export const ONLINE_CHESS_GAME_SET_INCREMENT = "ONLINE_CHESS_GAME_SET_INCREMENT";

export const setDraggedPiece = (draggedPiece) => {
    return {
        type: ONLINE_CHESS_GAME_SET_DRAGGED_PIECE,
        payload: draggedPiece
    };
};

export const setCellsToHighlight = (cellsToHighlight) => {
    return {
        type: ONLINE_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT,
        payload: cellsToHighlight
    };
};

export const setPgn = (pgn) => {
    return {
        type: ONLINE_CHESS_GAME_SET_PGN,
        payload: pgn
    };
};

export const setFen = (fen) => {
    return {
        type: ONLINE_CHESS_GAME_SET_FEN,
        payload: fen
    };
};

export const setOrientation = (orientation) => {
    return {
        type: ONLINE_CHESS_GAME_SET_ORIENTATION,
        payload: orientation
    };
};

export const setResult = (result) => {
    return {
        type: ONLINE_CHESS_GAME_SET_RESULT,
        payload: result
    };
};

export const reset = () => {
    return {
        type: ONLINE_CHESS_GAME_RESET
    };
};

export const setWhiteUserName = (userName) => {
    return {
        type: ONLINE_CHESS_GAME_SET_WHITE_USER_NAME,
        payload: userName
    };
};

export const setBlackUserName = (userName) => {
    return {
        type: ONLINE_CHESS_GAME_SET_BLACK_USER_NAME,
        payload: userName
    };
};

export const setWhiteRestOfTime = (restOfTime) => {
    return {
        type: ONLINE_CHESS_GAME_SET_WHITE_REST_OF_TIME,
        payload: restOfTime
    };
};

export const setBlackRestOfTime = (restOfTime) => {
    return {
        type: ONLINE_CHESS_GAME_SET_BLACK_REST_OF_TIME,
        payload: restOfTime
    };
};

export const setWhiteTimerStartDate = (startDate) => {
    return {
        type: ONLINE_CHESS_GAME_SET_WHITE_TIMER_START_DATE,
        payload: startDate
    };
};

export const setBlackTimerStartDate = (startDate) => {
    return {
        type: ONLINE_CHESS_GAME_SET_BLACK_TIMER_START_DATE,
        payload: startDate
    };
};

export const setStartClockFlag = (flag) => {
    return {
        type: ONLINE_CHESS_GAME_SET_START_CLOCK_FLAG,
        payload: flag
    };
};

export const setIncrement = (inc) => {
    return {
        type: ONLINE_CHESS_GAME_SET_INCREMENT,
        payload: inc
    };
};