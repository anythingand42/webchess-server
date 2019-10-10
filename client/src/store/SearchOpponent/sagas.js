import { put, takeEvery, all, select } from "redux-saga/effects";
import {
    SEARCH_OPPONENT_FETCH_INITIAL_STATE,
    ADD_CHALLENGE,
    REMOVE_CHALLENGE,
    SEARCH_OPPONENT_UNMOUNT,
    SEARCH_BUTTON_CLICK
} from "./sagaActions.js";
import {
    LOBBY_SET_CHALLENGES,
    SEARCH_BUTTON_SET_AVAILABILITY,
    SEARCH_BUTTON_SET_PRESSED,
    SEARCH_OPPONENT_RESET
} from "./actions.js";

function* searchOpponentSetInitialState() {
    yield put({
        type: "toServer/SearchOpponent/connect"
    });
}

function* lobbySetChallenges(action) {
    console.log("challenges", action.payload);
    yield put({
        type: LOBBY_SET_CHALLENGES,
        payload: action.payload
    });
}

function* addChallenge(userName, time) {
    yield put({
        type: SEARCH_BUTTON_SET_AVAILABILITY,
        payload: {
            buttonName: time,
            isAvailable: false
        }
    });
    yield put({
        type: SEARCH_BUTTON_SET_PRESSED,
        payload: {
            buttonName: time,
            isPressed: true
        }
    });
    yield put({
        type: "toServer/SearchOpponent/add_challenge",
        payload: {
            time: time,
            challengerName: userName
        }
    });
}

function* removeChallenge(userName, time) {
    yield put({
        type: SEARCH_BUTTON_SET_AVAILABILITY,
        payload: {
            buttonName: time,
            isAvailable: false
        }
    });
    yield put({
        type: SEARCH_BUTTON_SET_PRESSED,
        payload: {
            buttonName: time,
            isPressed: false
        }
    });
    yield put({
        type: "toServer/SearchOpponent/remove_challenge",
        payload: {
            time: time,
            challengerName: userName
        }
    });
}

function* searchButtonSetAvailability(action) {
    yield put({
        type: SEARCH_BUTTON_SET_AVAILABILITY,
        payload: {
            buttonName: action.payload,
            isAvailable: true
        }
    });
}

function* handleUnmount() {
    yield put({
        type: "toServer/SearchOpponent/unmount"
    });
    yield put({
        type: SEARCH_OPPONENT_RESET
    });
}

function* handleSearchButtonClick(action) {
    const time = action.payload;
    const store = yield select();
    const props = store.searchOpponent;
    const userName = store.main.userName;

    if(props.buttons[time].isAvailable) {
        if(!props.buttons[time].isPressed) {
            yield* addChallenge(userName, time);
        } else {
            yield* removeChallenge(userName, time);
        }
    }
}

export function* searchOpponentWatcherSaga() {
    yield all([
        takeEvery(SEARCH_OPPONENT_FETCH_INITIAL_STATE, searchOpponentSetInitialState),
        takeEvery("toClient/SearchOpponent/send_challenges", lobbySetChallenges),
        takeEvery("toClient/SearchOpponent/challenge_request_is_processed", searchButtonSetAvailability),
        takeEvery(SEARCH_OPPONENT_UNMOUNT, handleUnmount),
        takeEvery(SEARCH_BUTTON_CLICK, handleSearchButtonClick)
    ]);
}