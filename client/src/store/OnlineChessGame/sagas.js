import { put, takeEvery, all, select } from "redux-saga/effects";
import {
    ONLINE_CHESS_GAME_FETCH_INITIAL_STATE,
    ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD,
    ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD,
    ONLINE_CHESS_GAME_UNMOUNT,
    ONLINE_CHESS_GAME_WHITE_TIME_OUT,
    ONLINE_CHESS_GAME_BLACK_TIME_OUT,
    ONLINE_CHESS_GAME_CHAT_SUBMIT
} from "./sagaActions.js";
import {
    ONLINE_CHESS_GAME_SET_IS_ACTIVE,
    setDraggedPiece,
    setCellsToHighlight,
    setFen,
    setPgn,
    setOrientation,
    setWhiteUserName,
    setBlackUserName,
    setWhiteRestOfTime,
    setBlackRestOfTime,
    setWhiteTimerStartDate,
    setBlackTimerStartDate,
    setIncrement,
    reset,
    setResult,
    chatSetMessages
} from "./actions.js";

import { mainSetGameFlag } from "../Main/actions.js";

import Chess from "chess.js";

function* onlineChessGameFetchGameOptions() {
    yield put({
        type: "toServer/OnlineChessGame/connect"
    });
}

function* setGameOptions(action) {
    console.log(action);
    const chessGame = new Chess();
    chessGame.load_pgn(action.payload.pgn);
    const fen = chessGame.fen();
    const splittedFen = fen.split(" ");
    const numberOfMove = Number(splittedFen[splittedFen.length - 1]);
    let whiteTimerStartDate = null;
    let blackTimerStartDate = null;
    if(numberOfMove > 1) {
        if(chessGame.turn() === "w") whiteTimerStartDate = action.payload.lastUpdateDate;
        else blackTimerStartDate = action.payload.lastUpdateDate;
    }

    console.log(action.payload.chatMessages);

    yield all([
        put( setOrientation(action.payload.orientation) ),
        put( setPgn(action.payload.pgn) ),
        put( setFen(fen) ),
        put( setWhiteUserName(action.payload.whiteUserName) ),
        put( setBlackUserName(action.payload.blackUserName) ),
        put( setWhiteRestOfTime(action.payload.whiteRestOfTime) ),
        put( setBlackRestOfTime(action.payload.blackRestOfTime) ),
        put( setIncrement(action.payload.incInMs) ),
        put( setWhiteTimerStartDate(whiteTimerStartDate) ),
        put( setBlackTimerStartDate(blackTimerStartDate) ),
        put( chatSetMessages(action.payload.chatMessages || "") )
    ]);

    yield put({
        type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
        payload: true
    });
    
}

function* handleMouseDownOnBoard(action) {
    const store = yield select();
    const props = store.onlineChessGame;
    if(!props.isActive) return;

    const {id, clientX, clientY} = action.payload;
    const chessGame = new Chess();
    chessGame.load_pgn(props.pgn);

    const piece = chessGame.get(id);
    if(piece) {
        if(props.orientation !== piece.color) return;
        const cellsToHighlight = chessGame.moves({
            square: id,
            verbose: true
        }).map(move => move.to);

        yield all([
            put(setDraggedPiece({
                    left: clientX,
                    top: clientY,
                    piece: `${piece.color}${piece.type}`,
                    idFrom: id
                })
            ),
            put(setCellsToHighlight(cellsToHighlight))
        ]);
    }
}

function* handleMouseUpOnBoard(action) {
    const store = yield select();
    const props = store.onlineChessGame;

    if(!props.isActive) return;
    if(!props.draggedPiece) return;

    const id = action.payload;

    const chessGame = new Chess();
    chessGame.load_pgn(props.pgn);

    const idFrom = props.draggedPiece.idFrom;
    const idTo = id;
    const move = chessGame.move({
        from: idFrom,
        to: idTo,
        promotion: "q"
    });

    yield all([
        put( setDraggedPiece(null) ),
        put( setCellsToHighlight(null) )
    ]);

    if(move) {

        const {
            whiteTimerStartDate,
            blackTimerStartDate,
            whiteTimeAfterMouseUp,
            blackTimeAfterMouseUp
        } = getChessClockPropsAfterMouseUp({
            chessGame,
            dateInMs: new Date().getTime(),
            whiteRestOfTime: props.whiteRestOfTime,
            blackRestOfTime: props.blackRestOfTime,
            startClockDate: props.whiteTimerStartDate || props.blackTimerStartDate,
            increment: props.increment
        });

        yield all([
            put( setFen(chessGame.fen()) ),
            put( setPgn(chessGame.pgn()) ),
            put( setWhiteTimerStartDate(whiteTimerStartDate) ),
            put( setBlackTimerStartDate(blackTimerStartDate) ),
            put( setWhiteRestOfTime(whiteTimeAfterMouseUp) ),
            put( setBlackRestOfTime(blackTimeAfterMouseUp) )
        ]);

        yield put({
            type: "toServer/OnlineChessGame/send_move",
            payload: {
                idFrom: idFrom,
                idTo: idTo,
                pgn: chessGame.pgn(),
                whiteRestOfTime: whiteTimeAfterMouseUp,
                blackRestOfTime: blackTimeAfterMouseUp
            }
        });
    }
}

function getChessClockPropsAfterMouseUp({
    chessGame,
    dateInMs,
    whiteRestOfTime,
    blackRestOfTime,
    startClockDate,
    increment
}) {
    let whiteTimerStartDate = null;
    let blackTimerStartDate = null;
    let whiteTimeAfterMouseUp = whiteRestOfTime;
    let blackTimeAfterMouseUp = blackRestOfTime;

    const turnAfterMouseUp = chessGame.turn();
    const fenAfterMouseUp = chessGame.fen();
    const splittedFen = fenAfterMouseUp.split(" ");
    const numberOfMove = Number(splittedFen[splittedFen.length - 1]);
    if(numberOfMove > 1) {
        if(turnAfterMouseUp === "w") whiteTimerStartDate = dateInMs;
        else blackTimerStartDate = dateInMs;
    }

    if(turnAfterMouseUp === "w" && numberOfMove > 2) {
        blackTimeAfterMouseUp = blackRestOfTime - (dateInMs - startClockDate) + increment;
    }
    if(turnAfterMouseUp === "b" && numberOfMove > 1) {
        whiteTimeAfterMouseUp = whiteRestOfTime - (dateInMs - startClockDate) + increment;
    }

    return {
        whiteTimerStartDate,
        blackTimerStartDate,
        whiteTimeAfterMouseUp,
        blackTimeAfterMouseUp
    }
}

function* handleSendMove(action) {
    const data = action.payload;
    console.log(data);

    const chessGame = new Chess();
    chessGame.load_pgn(data.pgn);
    const fen = chessGame.fen();

    const splittedFen = fen.split(" ");
    const numberOfMove = Number(splittedFen[splittedFen.length - 1]);
    let whiteTimerStartDate = null;
    let blackTimerStartDate = null;
    const dateInMs = new Date().getTime();
    if(numberOfMove > 1) {
        if(chessGame.turn() === "w") whiteTimerStartDate = dateInMs;
        else blackTimerStartDate = dateInMs;
    }

    yield all([
        put( setCellsToHighlight([data.idFrom, data.idTo]) ),
        put( setPgn(data.pgn) ),
        put( setFen(fen) ),
        put( setWhiteRestOfTime(data.whiteRestOfTime) ),
        put( setBlackRestOfTime(data.blackRestOfTime) ),
        put( setWhiteTimerStartDate(whiteTimerStartDate) ),
        put( setBlackTimerStartDate(blackTimerStartDate) )
    ]);

    if(chessGame.game_over()) {

        const store = yield select();
        const props = store.onlineChessGame;
        let result;
        let resultReason;

        if(chessGame.in_checkmate()) {
            result = props.orientation === "w" ? "black won" : "white won";
            resultReason = "checkmate";

            yield put({
                type: "toServer/OnlineChessGame/game_over",
                payload: {
                    result: result,
                    reason: resultReason,
                    whiteRestOfTime: data.whiteRestOfTime,
                    blackRestOfTime: data.blackRestOfTime
                }
            });
        }

        if(chessGame.in_draw()) {
            result = "draw";
            resultReason = "50-move rule";
            if(chessGame.in_stalemate()) resultReason = "stalemate";
            if(chessGame.in_threefold_repetition()) resultReason = "threefold repetition";
            if(chessGame.insufficient_material()) resultReason = "insufficient material";

            yield put({
                type: "toServer/OnlineChessGame/game_over",
                payload: {
                    result: result,
                    reason: resultReason,
                    whiteRestOfTime: data.whiteRestOfTime,
                    blackRestOfTime: data.blackRestOfTime
                }
            });
        }

        yield all([
            put({
                type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
                payload: false
            }),
            put( setWhiteTimerStartDate(null) ),
            put( setBlackTimerStartDate(null) ),
            put( setResult(result, resultReason) ),
            put( mainSetGameFlag(false) )
        ]);
    }
}

function* handleWhiteTimeOut() {

    const store = yield select();
    const props = store.onlineChessGame;
    const orientation = props.orientation;
    if(orientation !== "w") return;

    yield all([
        put({
            type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
            payload: false
        }),
        put( setWhiteTimerStartDate(null) ),
        put( setBlackTimerStartDate(null) ),
        put( setWhiteRestOfTime(0) ),
        put( setResult("black won", "time out") ),
        put( mainSetGameFlag(false) )
    ]);

    yield put({
        type: "toServer/OnlineChessGame/game_over",
        payload: {
            result: "black won",
            reason: "time out",
            whiteRestOfTime: 0,
            blackRestOfTime: props.blackRestOfTime
        }
    });
}

function* handleBlackTimeOut() {

    const store = yield select();
    const orientation = store.onlineChessGame.orientation;
    if(orientation !== "b") return;

    yield all([
        put({
            type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
            payload: false
        }),
        put( setWhiteTimerStartDate(null) ),
        put( setBlackTimerStartDate(null) ),
        put( setBlackRestOfTime(0) ),
        put( setResult("white won", "time out") ),
        put( mainSetGameFlag(false) )
    ]);

    yield put({
        type: "toServer/OnlineChessGame/game_over",
        payload: {
            result: "white won",
            reason: "time out",
            whiteRestOfTime: props.whiteRestOfTime,
            blackRestOfTime: 0
        }
    });
}

function* handleGameOver(action) {
    if(!action.payload.whiteRestOfTime || !action.payload.blackRestOfTime ) {
        const store = yield select();
        const props = store.onlineChessGame;
        const chessGame = new Chess(props.fen);
        let whiteRestOfTime = props.whiteRestOfTime;
        let blackRestOfTime = props.blackRestOfTime;
        if(chessGame.turn() === "w" && props.whiteTimerStartDate) {
            whiteRestOfTime -= new Date().getTime() - props.whiteTimerStartDate;
        }
        if(chessGame.turn() === "b" && props.blackTimerStartDate) {
            blackRestOfTime -= new Date().getTime() - props.blackTimerStartDate;
        }

        yield all([
            put({
                type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
                payload: false
            }),
            put( setWhiteTimerStartDate(null) ),
            put( setBlackTimerStartDate(null) ),
            put( setWhiteRestOfTime(whiteRestOfTime) ),
            put( setBlackRestOfTime(blackRestOfTime) ),
            put( setResult(action.payload.result, action.payload.reason) ),
            put( mainSetGameFlag(false) )
        ]);
        return;
    }

    yield all([
        put({
            type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
            payload: false
        }),
        put( setWhiteTimerStartDate(null) ),
        put( setBlackTimerStartDate(null) ),
        put( setWhiteRestOfTime(action.payload.whiteRestOfTime) ),
        put( setBlackRestOfTime(action.payload.blackRestOfTime) ),
        put( setResult(action.payload.result, action.payload.reason) ),
        put( mainSetGameFlag(false) )
    ]);
}

function* handleUnmount() {
    const store = yield select();
    if(store.onlineChessGame.result) {
        yield put({
            type: "toServer/OnlineChessGame/user_left"
        });
    }
    yield put(reset());
}

function* chatHandleSubmit(action) {
    const store = yield select();
    let senderName = store.main.userName;
    const inputMsg = action.payload;
    if(!senderName) {
        const orientation = store.onlineChessGame.orientation;
        if(orientation === "w") senderName = "white";
        else senderName = "black";
    }
    const msg = `${senderName}: ${inputMsg}`;
    yield put({
        type: "toServer/OnlineChessGame/send_chat_msg",
        payload: msg
    });
}

function* handleSendMsg(action) {
    const store = yield select();
    yield put( chatSetMessages(`${store.onlineChessGame.chatMessages}${action.payload}\n`) )
}

export function* onlineChessGameWatcherSaga() {
    yield all([
        takeEvery(ONLINE_CHESS_GAME_FETCH_INITIAL_STATE, onlineChessGameFetchGameOptions),
        takeEvery("toClient/OnlineChessGame/send_game_options", setGameOptions),
        takeEvery(ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD, handleMouseDownOnBoard),
        takeEvery(ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD, handleMouseUpOnBoard),
        takeEvery("toClient/OnlineChessGame/send_move", handleSendMove),
        takeEvery(ONLINE_CHESS_GAME_WHITE_TIME_OUT, handleWhiteTimeOut),
        takeEvery(ONLINE_CHESS_GAME_BLACK_TIME_OUT, handleBlackTimeOut),
        takeEvery(ONLINE_CHESS_GAME_UNMOUNT, handleUnmount),
        takeEvery("toClient/OnlineChessGame/game_over", handleGameOver),
        takeEvery(ONLINE_CHESS_GAME_CHAT_SUBMIT, chatHandleSubmit),
        takeEvery("toClient/OnlineChessGame/send_chat_msg", handleSendMsg)
    ]);
}