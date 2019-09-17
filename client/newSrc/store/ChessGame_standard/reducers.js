import Chess from "chess.js";

import {
    SET_TRAVELING_PIECE,
    SET_CELLS_TO_HIGHLIGHT,
    SET_GAME,
    SET_PGN,
    SET_FEN,
    SET_ORIENTATION,
    SET_OPPONENT_SOCKET_ID,
    SET_WHITE_REST_OF_TIME,
    SET_BLACK_REST_OF_TIME
} from "./actions";

const defaultState = {
    travelingPiece: null,
    cellsToHighlight: null,
    game: new Chess(),
    pgn: null,
    fen: "start",
    orientation: "w",
    opponentSocketId: null,
    whiteRestOfTime: 0,
    blackRestOfTime: 0
};

export const chessGameStandardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TRAVELING_PIECE:
            return {
                ...state,
                travelingPiece: action.payload
            };
        case SET_CELLS_TO_HIGHLIGHT:
            return {
                ...state,
                cellsToHighlight: action.payload
            };
        case SET_GAME:
            return {
                ...state,
                game: action.payload
            };
        case SET_PGN:
            return {
                ...state,
                pgn: action.payload
            };
        case SET_FEN:
            return {
                ...state,
                fen: action.payload
            };
        case SET_ORIENTATION:
            return {
                ...state,
                orientation: action.payload
            };
        case SET_OPPONENT_SOCKET_ID:
            return {
                ...state,
                opponentSocketId: action.payload
            };
        case SET_WHITE_REST_OF_TIME:
            return {
                ...state,
                whiteRestOfTime: action.payload
            };
        case SET_BLACK_REST_OF_TIME:
            return {
                ...state,
                blackRestOfTime: action.payload
            };
        default:
            return state;
    }
};