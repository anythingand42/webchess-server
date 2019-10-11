"use strict";
const AnonChallenge = require("../models/anonChallenge.js");
const ChessGame = require("../models/chessGame.js");
const User = require("../models/user.js");

async function handleAnonDisconnect(user, io, socketId) {
    
    await AnonChallenge.deleteMany({challengerSocketId: socketId});
    io.to("anonymous").emit("action", {
        type: "toClient/SearchOpponent/send_challenges",
        payload: await AnonChallenge.find({})
    });

    if(user.activeGameId) {
        const color = user.activeGameColor;
        let result, resultReason;
        let opponentColor;
        let turn;
        if(color === "w") {
            opponentColor = "b";
            result = "black won";
            resultReason = "white disconnected";
            turn = "white";
        } else {
            opponentColor = "w";
            result = "white won";
            resultReason = "black disconnected";
            turn = "black";
        }

        const chessGame = await ChessGame.findById(user.activeGameId);
        if(!chessGame.isGameOver) {
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
        }

        const opponent = await User.findById(chessGame[opponentColor].userId);
        opponent.activeGameId = null;
        opponent.activeGameColor = null;

        await Promise.all([
            opponent.save(),
            chessGame.remove()
        ]);
    }

    await user.remove();
}

module.exports = handleAnonDisconnect;