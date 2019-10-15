module.exports = async function handleSendChatMsg({io, socket, chessGame, opponentColor, payload}) {
    if(!chessGame) return;
    chessGame.chatMessages = `${chessGame.chatMessages || ""}${payload}\n`;
    await chessGame.save();
    socket.emit("action", {
        type: "toClient/OnlineChessGame/send_chat_msg",
        payload: payload
    });
    io.to(chessGame[opponentColor].socketId).emit("action", {
        type: "toClient/OnlineChessGame/send_chat_msg",
        payload: payload
    });
}