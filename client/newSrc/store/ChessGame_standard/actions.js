export const SET_TRAVELING_PIECE = "SET_TRAVELING_PIECE";
export const SET_CELLS_TO_HIGHLIGHT = "SET_CELLS_TO_HIGHLIGHT";
export const SET_GAME = "SET_GAME";
export const SET_PGN = "SET_PGN";
export const SET_FEN = "SET_FEN";
export const SET_ORIENTATION = "SET_ORIENTATION";
export const SET_OPPONENT_SOCKET_ID = "SET_OPPONENT_SOCKET_ID";
export const SET_WHITE_REST_OF_TIME = "SET_WHITE_REST_OF_TIME";
export const SET_BLACK_REST_OF_TIME = "SET_BLACK_REST_OF_TIME";

export const setTravelingPiece = (travelingPiece) => {
    return {
        type: SET_TRAVELING_PIECE,
        payload: travelingPiece
    };
};

export const setCellsToHighlight = (cellsToHighlight) => {
    return {
        type: SET_CELLS_TO_HIGHLIGHT,
        payload: cellsToHighlight
    };
};

export const setGame = (game) => {
    return {
        type: SET_GAME,
        payload: game
    };
};

export const setPgn = (pgn) => {
    return {
        type: SET_PGN,
        payload: pgn
    };
};

export const setFen = (fen) => {
    return {
        type: SET_FEN,
        payload: fen
    };
};

export const setOrientation = (orientation) => {
    return {
        type: SET_ORIENTATION,
        payload: orientation
    };
};

export const setOpponentSocketId = (opponentSocketId) => {
    return {
        type: SET_OPPONENT_SOCKET_ID,
        payload: opponentSocketId
    };
};

export const setWhiteRestOfTime = (whiteRestOfTime) => {
    return {
        type: SET_WHITE_REST_OF_TIME,
        payload: whiteRestOfTime
    };
};

export const setBlackRestOfTime = (blackRestOfTime) => {
    return {
        type: SET_BLACK_REST_OF_TIME,
        payload: blackRestOfTime
    };
};