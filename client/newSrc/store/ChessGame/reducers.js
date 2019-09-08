import Chess from "chess.js";

import {
    SET_TRAVELING_PIECE,
    SET_CELLS_TO_HIGHLIGHT,
    SET_GAME
} from "./actions";

const defaultState = {
    travelingPiece: null,
    cellsToHighlight: null,
    game: new Chess()
};

export const chessGameReducer = (state = defaultState, action) => {
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
        default:
            return state;
    }
};