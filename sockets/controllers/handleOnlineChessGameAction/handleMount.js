module.exports = async function handleMount({socket, user, chessGame}) {
    if(!chessGame) return;
    if(chessGame.isGameOver) return;
    user.activeComponent = "OnlineChessGame";
    await user.save();

    socket.emit("action", {
        type: "toClient/OnlineChessGame/send_game_options",
        payload: {
            pgn: chessGame.pgn,
            incInMs: chessGame.incInMs,
            whiteRestOfTime: chessGame["w"].restOfTime,
            blackRestOfTime: chessGame["b"].restOfTime,
            orientation: user.activeGameColor,
            lastUpdateDate: chessGame.lastUpdateDate,
            whiteUserName: chessGame["w"].userName,
            blackUserName: chessGame["b"].userName,
            chatMessages: chessGame.chatMessages
        }
    });
}