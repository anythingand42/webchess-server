module.exports = async function handleSendMove({io, chessGame, opponentColor, payload}) {
    if(!chessGame) return;
    if(chessGame.isGameOver) return;
    const data = payload;
    chessGame.pgn = data.pgn;
    chessGame["w"].restOfTime = data.whiteRestOfTime;
    chessGame["b"].restOfTime = data.blackRestOfTime;
    chessGame.lastUpdateDate = new Date().getTime();
    await chessGame.save();
    io.to(chessGame[opponentColor].socketId).emit("action", {
        type: "toClient/OnlineChessGame/send_move",
        payload: data
    });
}