module.exports = async function handleGameOver({io, chessGame, opponentColor, payload}) {
    if(!chessGame) return;
    if(chessGame.isGameOver) throw new Error("handleGameOver: game in database is already over");

    io.to(chessGame[opponentColor].socketId).emit("action", {
        type: "toClient/OnlineChessGame/game_over",
        payload: payload
    });

    chessGame.isGameOver = true;
    await chessGame.save();
}