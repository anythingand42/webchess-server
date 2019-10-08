import {
    ONLINE_CHESS_GAME_SET_DRAGGED_PIECE,
    ONLINE_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT,
    ONLINE_CHESS_GAME_SET_PGN,
    ONLINE_CHESS_GAME_SET_FEN,
    ONLINE_CHESS_GAME_SET_ORIENTATION,
    ONLINE_CHESS_GAME_SET_RESULT,
    ONLINE_CHESS_GAME_SET_IS_ACTIVE,
    ONLINE_CHESS_GAME_RESET,
    ONLINE_CHESS_GAME_SET_WHITE_USER_NAME,
    ONLINE_CHESS_GAME_SET_BLACK_USER_NAME,
    ONLINE_CHESS_GAME_SET_WHITE_REST_OF_TIME,
    ONLINE_CHESS_GAME_SET_BLACK_REST_OF_TIME,
    ONLINE_CHESS_GAME_SET_WHITE_TIMER_START_DATE,
    ONLINE_CHESS_GAME_SET_BLACK_TIMER_START_DATE,
    ONLINE_CHESS_GAME_SET_INCREMENT
} from "./actions";

const defaultState = {
    isActive: false,
    draggedPiece: null,
    cellsToHighlight: null,
    pgn: null,
    fen: "start",
    orientation: "w",
    result: null,
    whiteUserName: null,
    blackUserName: null,
    whiteRestOfTime: null,
    blackRestOfTime: null,
    whiteTimerStartDate: null,
    blackTimerStartDate: null,
    increment: null
};

export const onlineChessGameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ONLINE_CHESS_GAME_SET_DRAGGED_PIECE:
            return {
                ...state,
                draggedPiece: action.payload
            };

        case ONLINE_CHESS_GAME_SET_CELLS_TO_HIGHLIGHT:
            return {
                ...state,
                cellsToHighlight: action.payload
            };

        case ONLINE_CHESS_GAME_SET_PGN:
            return {
                ...state,
                pgn: action.payload
            };

        case ONLINE_CHESS_GAME_SET_FEN:
            return {
                ...state,
                fen: action.payload
            };

        case ONLINE_CHESS_GAME_SET_ORIENTATION:
            return {
                ...state,
                orientation: action.payload
            };
            
        case ONLINE_CHESS_GAME_SET_RESULT:
            return {
                ...state,
                result: action.payload
            };

        case ONLINE_CHESS_GAME_SET_IS_ACTIVE:
            return {
                ...state,
                isActive: action.payload
            };

        case ONLINE_CHESS_GAME_SET_WHITE_USER_NAME:
            return {
                ...state,
                whiteUserName: action.payload
            };

        case ONLINE_CHESS_GAME_SET_BLACK_USER_NAME:
            return {
                ...state,
                blackUserName: action.payload
            };

        case ONLINE_CHESS_GAME_SET_WHITE_REST_OF_TIME:
            return {
                ...state,
                whiteRestOfTime: action.payload
            };

        case ONLINE_CHESS_GAME_SET_BLACK_REST_OF_TIME:
            return {
                ...state,
                blackRestOfTime: action.payload
            };

        case ONLINE_CHESS_GAME_SET_WHITE_TIMER_START_DATE:
            return {
                ...state,
                whiteTimerStartDate: action.payload
            };

        case ONLINE_CHESS_GAME_SET_BLACK_TIMER_START_DATE:
            return {
                ...state,
                blackTimerStartDate: action.payload
            };

        case ONLINE_CHESS_GAME_SET_INCREMENT:
                return {
                    ...state,
                    increment: action.payload
                };

        case ONLINE_CHESS_GAME_RESET:
            return defaultState;

        default:
            return state;
    }
};