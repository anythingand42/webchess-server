import { combineReducers } from "redux";
import { mainReducer } from "./Main/reducers.js"
import { chessGameReducer } from "./ChessGame/reducers.js";
import { searchOpponentReducer } from "./SearchOpponent/reducers.js";

export default combineReducers({
    main: mainReducer,
    chessGame: chessGameReducer,
    searchOpponent: searchOpponentReducer
});