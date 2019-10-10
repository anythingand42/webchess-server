import { combineReducers } from "redux";
import { mainReducer } from "./Main/reducer.js"
import { trainingChessGameReducer } from "./TrainingChessGame/reducer.js";
import { onlineChessGameReducer } from "./OnlineChessGame/reducer.js";
import { searchOpponentReducer } from "./SearchOpponent/reducer.js";
import { logInReducer } from "./LogIn/reducer.js";
import { signUpReducer } from "./SignUp/reducer.js";

export default combineReducers({
    main: mainReducer,
    trainingChessGame: trainingChessGameReducer,
    onlineChessGame: onlineChessGameReducer,
    searchOpponent: searchOpponentReducer,
    logIn: logInReducer,
    signUp: signUpReducer
});