export const SET_DRAGGED_PIECE = "SET_DRAGGED_PIECE";
export const SET_CELLS_TO_HIGHLIGHT = "SET_CELLS_TO_HIGHLIGHT";
export const SET_GAME = "SET_GAME";

export const setDraggedPiece = (draggedPiece) => {
    return {
        type: SET_DRAGGED_PIECE,
        payload: draggedPiece
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