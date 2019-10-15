"use strict";

const ChessGame = require("../../../../models/chessGame.js");
const User = require("../../../../models/user.js");

async function handleUserDisconnect({io, user}) {
    if(!user.activeGameId) return;
    const id = user._id;
    setTimeout(async () => {
        const user = await User.findById(id);
        if(user.isSessionActive) return;

        let result;
        const resultReason = `${user.name} disconnected`;
        let opponentColor;
        if(user.activeGameColor === "w") {
            opponentColor = "b";
            result = "black won";
        } else {
            opponentColor = "w";
            result = "white won";
        }

        const chessGame = await ChessGame.findById(user.activeGameId);
        if(!chessGame) {
            console.log("handleUserDisconnect timeout: can't find chess game in database");
            return;
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
            payload: `${user.name} left the game, so chat is off`
        });

        const opponent = await User.findById(chessGame[opponentColor].userId);
        opponent.activeGameId = null;
        opponent.activeGameColor = null;

        user.activeGameId = null;
        user.activeGameColor = null;

        await Promise.all([
            user.save(),
            opponent.save(),
            chessGame.remove()
        ]);
    }, 20000);
}

module.exports = handleUserDisconnect;