export const STANDARD_CHESS_GAME_SET_DRAGGED_PIECE = "STANDARD_CHESS_GAME_SET_DRAGGED_PIECE";
export const STANDARD_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT = "STANDARD_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT";
export const STANDARD_CHESS_GAME_SET_PGN = "STANDARD_CHESS_GAME_SET_PGN";
export const STANDARD_CHESS_GAME_SET_FEN = "STANDARD_CHESS_GAME_SET_FEN";
export const STANDARD_CHESS_GAME_SET_ORIENTATION = "STANDARD_CHESS_GAME_SET_ORIENTATION";
export const STANDARD_CHESS_GAME_SET_OPPONENT_SOCKET_ID = "STANDARD_CHESS_GAME_SET_OPPONENT_SOCKET_ID";
export const STANDARD_CHESS_GAME_SET_WHITE_REST_OF_TIME = "STANDARD_CHESS_GAME_SET_WHITE_REST_OF_TIME";
export const STANDARD_CHESS_GAME_SET_BLACK_REST_OF_TIME = "STANDARD_CHESS_GAME_SET_BLACK_REST_OF_TIME";
export const STANDARD_CHESS_GAME_SET_RESULT = "STANDARD_CHESS_GAME_SET_RESULT";
export const STANDARD_CHESS_GAME_RESET = "STANDARD_CHESS_GAME_STANDARD_CHESS_GAME_RESET";

export const setDraggedPiece = (draggedPiece) => {
    return {
        type: STANDARD_CHESS_GAME_SET_DRAGGED_PIECE,
        payload: draggedPiece
    };
};

export const setCellsToHighlight = (cellsToHighlight) => {
    return {
        type: STANDARD_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT,
        payload: cellsToHighlight
    };
};

export const setPgn = (pgn) => {
    return {
        type: STANDARD_CHESS_GAME_SET_PGN,
        payload: pgn
    };
};

export const setFen = (fen) => {
    return {
        type: STANDARD_CHESS_GAME_SET_FEN,
        payload: fen
    };
};

export const setOrientation = (orientation) => {
    return {
        type: STANDARD_CHESS_GAME_SET_ORIENTATION,
        payload: orientation
    };
};

export const setOpponentSocketId = (opponentSocketId) => {
    return {
        type: STANDARD_CHESS_GAME_SET_OPPONENT_SOCKET_ID,
        payload: opponentSocketId
    };
};

export const setWhiteRestOfTime = (whiteRestOfTime) => {
    return {
        type: STANDARD_CHESS_GAME_SET_WHITE_REST_OF_TIME,
        payload: whiteRestOfTime
    };
};

export const setBlackRestOfTime = (blackRestOfTime) => {
    return {
        type: STANDARD_CHESS_GAME_SET_BLACK_REST_OF_TIME,
        payload: blackRestOfTime
    };
};

export const setResult = (result) => {
    return {
        type: STANDARD_CHESS_GAME_SET_RESULT,
        payload: result
    };
};

export const reset = () => {
    return {
        type: STANDARD_CHESS_GAME_RESET
    };
};