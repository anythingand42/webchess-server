export const SET_TRAVELING_PIECE = "SET_TRAVELING_PIECE";
export const SET_CELLS_TO_HIGHLIGHT = "SET_CELLS_TO_HIGHLIGHT";
export const SET_GAME = "SET_GAME";

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