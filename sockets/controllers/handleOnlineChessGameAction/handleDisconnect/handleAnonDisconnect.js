const User = require("../../../../models/user.js");

module.exports = async function handleAnonDisconnect({io, chessGame, opponentColor, user}) {
    if(chessGame.isGameOver) {
        const turn = user.activeGameColor === "w" ? "white" : "black";
        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/send_chat_msg",
            payload: `${turn} left the game, so chat is off`
        });
        const opponent = await User.findById(chessGame[opponentColor].userId);
        opponent.activeGameId = null;
        opponent.activeGameColor = null;
        await Promise.all([
            opponent.save(),
            chessGame.remove(),
            user.remove()
        ]);
    } else {
        let result, resultReason;
        if(user.activeGameColor === "w") {
            result = "black won";
            resultReason = "white disconnected";
            turn = "white";
        } else {
            result = "white won";
            resultReason = "black disconnected";
            turn = "black";
        }
        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/game_over",
            payload: {
                result,
                reason: resultReason
            }
        });
        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/send_chat_msg",
            payload: `${turn} left the game, so chat is off`
        });
        const opponent = await User.findById(chessGame[opponentColor].userId);
        opponent.activeGameId = null;
        opponent.activeGameColor = null;
        await Promise.all([
            opponent.save(),
            chessGame.remove(),
            user.remove()
        ]);
    }
}