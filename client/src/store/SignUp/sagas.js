import { takeEvery, put, all } from "redux-saga/effects";
import {
    SIGN_UP,
    SIGN_UP_UNMOUNT
} from "./sagaActions.js";
import {
    setMessage,
    reset
} from "./actions.js";

function* signUp(action) {

    if(!action.payload.userName) {
        yield put(setMessage("username is required"));
        return;
    }

    if(!action.payload.password) {
        yield put(setMessage("password is required"));
        return;
    }

    if(action.payload.repeatPassword !== action.payload.password) {
        yield put(setMessage("the entered passwords don't match"));
        return;
    }

    const response = yield fetch("/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: action.payload.userName,
            password: action.payload.password
        })
    });

    const text = yield response.text();
    yield put(setMessage(text));
}

function* handleUnmount() {
    yield put(reset());
}

export function* signUpWatcherSaga() {
    yield all([
        takeLeading(SIGN_UP, signUp),
        takeLeading(SIGN_UP_UNMOUNT, handleUnmount)
    ]);
}