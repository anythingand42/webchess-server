import { all } from "redux-saga/effects";
import { mainWatcherSaga } from "./Main/sagas.js";
import { searchOpponentWatcherSaga } from "./SearchOpponent/sagas.js";
import { logInWatcherSaga } from "./LogIn/sagas.js";
import { onlineChessGameWatcherSaga } from "./OnlineChessGame/sagas.js";
import { signUpWatcherSaga } from "./SignUp/sagas.js";

export default function* rootSaga() {
    yield all([
        mainWatcherSaga(),
        searchOpponentWatcherSaga(),
        logInWatcherSaga(),
        onlineChessGameWatcherSaga(),
        signUpWatcherSaga()
    ]);
}