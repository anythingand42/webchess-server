import { put, takeEvery, all } from "redux-saga/effects";
import {
    MAIN_FETCH_INITIAL_STATE,
    LOG_OUT
} from "./sagaActions.js";
import {
    MAIN_SET_USER_NAME,
    MAIN_SET_GAME_FLAG
} from "./actions.js";

function* mainFetchInitialState() {
    const response = yield fetch("/", { method: "POST" });
    const {userName} = yield response.json();
    yield put({
        type: MAIN_SET_USER_NAME,
        payload: userName
    });
    yield put({
        type: "toServer/Main/mount"
    });
}

function* logOut() {
    yield fetch("/logout", {
        method: "POST"
    })
    .then(() => {
        window.location.replace("/");
    })
}

function* startGame() {
    yield put({
        type: MAIN_SET_GAME_FLAG,
        payload: true
    });
}

export function* mainWatcherSaga() {
    yield all([
        takeEvery(MAIN_FETCH_INITIAL_STATE, mainFetchInitialState),
        takeEvery(LOG_OUT, logOut),
        takeEvery("toClient/Main/start_game", startGame)
    ]);
}