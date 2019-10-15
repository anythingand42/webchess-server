const User = require("../../../models/user.js");

module.exports = async function handleUnmount({io, user, chessGame, opponentColor}) {
    if(!chessGame) return;
    if(!chessGame.isGameOver) return;
    let msg;
    if(user.name) msg = `${user.name} left the game, so chat is off`;
    else {
        const turn = user.activeGameColor === "w" ? "white" : "black";
        msg = `${turn} left the game, so chat is off`;
    }
    io.to(chessGame[opponentColor].socketId).emit("action", {
        type: "toClient/OnlineChessGame/send_chat_msg",
        payload: msg
    });

    const opponent = await User.findById(chessGame[opponentColor].userId);
    opponent.activeGameId = null;
    opponent.activeGameColor = null;
    user.activeGameId = null;
    user.activeGameColor = null;
    await Promise.all([
        opponent.save(),
        user.save(),
        chessGame.remove()
    ]);
}