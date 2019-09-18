import {
    STANDARD_CHESS_GAME_SET_DRAGGED_PIECE,
    STANDARD_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT,
    STANDARD_CHESS_GAME_SET_PGN,
    STANDARD_CHESS_GAME_SET_FEN,
    STANDARD_CHESS_GAME_SET_ORIENTATION,
    STANDARD_CHESS_GAME_SET_OPPONENT_SOCKET_ID,
    STANDARD_CHESS_GAME_SET_WHITE_REST_OF_TIME,
    STANDARD_CHESS_GAME_SET_BLACK_REST_OF_TIME,
    STANDARD_CHESS_GAME_SET_RESULT,
    STANDARD_CHESS_GAME_RESET
} from "./actions";

const defaultState = {
    draggedPiece: null,
    cellsToHighlight: null,
    pgn: null,
    fen: "start",
    orientation: "w",
    opponentSocketId: null,
    whiteRestOfTime: 0,
    blackRestOfTime: 0,
    result: null
};

export const chessGameStandardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case STANDARD_CHESS_GAME_SET_DRAGGED_PIECE:
            return {
                ...state,
                draggedPiece: action.payload
            };
        case STANDARD_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT:
            return {
                ...state,
                cellsToHighlight: action.payload
            };
        case STANDARD_CHESS_GAME_SET_PGN:
            return {
                ...state,
                pgn: action.payload
            };
        case STANDARD_CHESS_GAME_SET_FEN:
            return {
                ...state,
                fen: action.payload
            };
        case STANDARD_CHESS_GAME_SET_ORIENTATION:
            return {
                ...state,
                orientation: action.payload
            };
        case STANDARD_CHESS_GAME_SET_OPPONENT_SOCKET_ID:
            return {
                ...state,
                opponentSocketId: action.payload
            };
        case STANDARD_CHESS_GAME_SET_WHITE_REST_OF_TIME:
            return {
                ...state,
                whiteRestOfTime: action.payload
            };
        case STANDARD_CHESS_GAME_SET_BLACK_REST_OF_TIME:
            return {
                ...state,
                blackRestOfTime: action.payload
            };
        case STANDARD_CHESS_GAME_SET_RESULT:
            return {
                ...state,
                result: action.payload
            };
        case STANDARD_CHESS_GAME_RESET:
            return defaultState;
        default:
            return state;
    }
};