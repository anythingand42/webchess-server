import { takeEvery, put, all } from "redux-saga/effects";
import {
    LOG_IN,
    LOG_IN_UNMOUNT
} from "./sagaActions.js";
import {
    LOG_IN_SET_MESSAGE,
    reset
} from "./actions.js";

function* logIn(action) {

    if(!action.payload.userName) {
        yield put({
            type: LOG_IN_SET_MESSAGE,
            payload: "username is required"
        });
        return;
    }

    if(!action.payload.password) {
        yield put({
            type: LOG_IN_SET_MESSAGE,
            payload: "password is required"
        });
        return;
    }

    const response = yield fetch("/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload)
    });

    if(response.status === 200) {
        window.location.replace("/");
    } else {
        const text = yield response.text();
        yield put({
            type: LOG_IN_SET_MESSAGE,
            payload: text
        });
    }
}

function* handleUnmount() {
    yield put(reset());
}

export function* logInWatcherSaga() {
    yield all([
        takeEvery(LOG_IN, logIn),
        takeEvery(LOG_IN_UNMOUNT, handleUnmount),
    ]);
}