import Chess from "chess.js";

import {
    SET_DRAGGED_PIECE,
    SET_CELLS_TO_HIGHLIGHT,
    SET_GAME
} from "./actions";

const defaultState = {
    draggedPiece: null,
    cellsToHighlight: null,
    game: new Chess()
};

export const chessGameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DRAGGED_PIECE:
            return {
                ...state,
                draggedPiece: action.payload
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