import { put, takeEvery, all, select } from "redux-saga/effects";
import {
    SEARCH_OPPONENT_FETCH_INITIAL_STATE,
    ADD_CHALLENGE,
    REMOVE_CHALLENGE,
    SEARCH_OPPONENT_UNMOUNT
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
    yield put({
        type: LOBBY_SET_CHALLENGES,
        payload: action.payload
    });
}

function* addChallenge(action) {
    const store = yield select();
    const challengerName = store.main.userName;
    yield put({
        type: SEARCH_BUTTON_SET_AVAILABILITY,
        payload: {
            buttonName: action.payload,
            isAvailable: false
        }
    });
    yield put({
        type: SEARCH_BUTTON_SET_PRESSED,
        payload: {
            buttonName: action.payload,
            isPressed: true
        }
    });
    yield put({
        type: "toServer/SearchOpponent/add_challenge",
        payload: {
            time: action.payload,
            challengerName: challengerName
        }
    });
}

function* removeChallenge(action) {
    const store = yield select();
    const challengerName = store.main.userName;
    yield put({
        type: SEARCH_BUTTON_SET_AVAILABILITY,
        payload: {
            buttonName: action.payload,
            isAvailable: false
        }
    });
    yield put({
        type: SEARCH_BUTTON_SET_PRESSED,
        payload: {
            buttonName: action.payload,
            isPressed: false
        }
    });
    yield put({
        type: "toServer/SearchOpponent/remove_challenge",
        payload: {
            time: action.payload,
            challengerName: challengerName
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

export function* searchOpponentWatcherSaga() {
    yield all([
        takeEvery(SEARCH_OPPONENT_FETCH_INITIAL_STATE, searchOpponentSetInitialState),
        takeEvery("toClient/SearchOpponent/send_challenges", lobbySetChallenges),
        takeEvery(ADD_CHALLENGE, addChallenge),
        takeEvery(REMOVE_CHALLENGE, removeChallenge),
        takeEvery("toClient/SearchOpponent/challenge_request_is_processed", searchButtonSetAvailability),
        takeEvery(SEARCH_OPPONENT_UNMOUNT, handleUnmount)
    ]);
}