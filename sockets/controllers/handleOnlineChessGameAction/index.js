const ChessGame = require("../../../models/chessGame.js");
const handleMount = require("./handleMount.js");
const handleSendMove = require("./handleSendMove.js");
const handleGameOver = require("./handleGameOver.js");
const handleSendChatMsg = require("./handleSendChatMsg.js");
const handleUnmount = require("./handleUnmount.js");
const handleDisconnect = require("./handleDisconnect");

const handlers = {
    "mount": handleMount,
    "send_move": handleSendMove,
    "game_over": handleGameOver,
    "send_chat_msg": handleSendChatMsg,
    "unmount": handleUnmount,
    "disconnect": handleDisconnect
}

async function handleOnlineChessGameAction({ io, socket, payload, type, user }) {
    if(!user.activeGameId) return;
    const chessGame = await ChessGame.findById(user.activeGameId);
    const opponentColor = user.activeGameColor === "b" ? "w" : "b";
    handlers[type]({io, socket, user, chessGame, opponentColor, payload});
}

module.exports = handleOnlineChessGameAction;