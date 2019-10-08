import { put, takeEvery, all, select } from "redux-saga/effects";
import {
    ONLINE_CHESS_GAME_FETCH_INITIAL_STATE,
    ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD,
    ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD,
    ONLINE_CHESS_GAME_UNMOUNT
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
    reset
} from "./actions.js";

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
    ]);

    yield put({
        type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
        payload: true
    });
    
}

function* handleMouseDownOnBoard(action) {
    const {id, clientX, clientY} = action.payload;
    const store = yield select();
    const props = store.onlineChessGame;
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
    const id = action.payload;
    const store = yield select();
    const props = store.onlineChessGame;
    console.log(props);

    if(!props.isActive) return;
    if(!props.draggedPiece) return;

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

    const result = chessGame.game_over();

    if(result) {

        yield put({
            type: ONLINE_CHESS_GAME_SET_IS_ACTIVE,
            payload: false
        });

        const store = yield select();
        const props = store.onlineChessGame;
        const opponentColor = props.orientation === "b" ? "w" : "b";

        if(chessGame.in_checkmate()) {
            yield put({
                type: "toServer/OnlineChessGame/game_over",
                payload: opponentColor
            });
        }

        if(chessGame.in_draw()) {
            yield put({
                type: "toServer/OnlineChessGame/game_over",
                payload: "d"
            });
        }
    }
}

function* handleUnmount() {
    yield put(reset());
}

export function* onlineChessGameWatcherSaga() {
    yield all([
        takeEvery(ONLINE_CHESS_GAME_FETCH_INITIAL_STATE, onlineChessGameFetchGameOptions),
        takeEvery("toClient/OnlineChessGame/send_game_options", setGameOptions),
        takeEvery(ONLINE_CHESS_GAME_MOUSE_DOWN_ON_BOARD, handleMouseDownOnBoard),
        takeEvery(ONLINE_CHESS_GAME_MOUSE_UP_ON_BOARD, handleMouseUpOnBoard),
        takeEvery("toClient/OnlineChessGame/send_move", handleSendMove),
        takeEvery(ONLINE_CHESS_GAME_UNMOUNT, handleUnmount)
    ]);
}