"use strict";

const UserChallenge = require("../models/userChallenge.js");
const ChessGame = require("../models/chessGame.js");
const User = require("../models/user.js");

async function handleUserDisconnect(user, io, socketId) {
    user.isConnected = false;
    user.isSessionActive = false;
    await user.save();

    await UserChallenge.deleteMany({challengerSocketId: socketId});
    io.to("users").emit("action", {
        type: "toClient/send_challenges",
        payload: await UserChallenge.find({})
    });

    if(user.activeGameId) {
        const id = user._id;
        setTimeout(async () => {
            const user = await User.findById(id);
            if(user.isConnected) return;

            const color = user.activeGameColor;
            let result;
            const resultReason = `${user.name} disconnected`;
            let opponentColor;
            if(color === "w") {
                opponentColor = "b";
                result = "black won";
            } else {
                opponentColor = "w";
                result = "white won";
            }

            const chessGame = await ChessGame.findById(user.activeGameId);
            if(!chessGame) {
                user.activeGameId = null;
                user.activeGameColor = null;
                await user.save();
                return;
            }

            io.to(chessGame[opponentColor].socketId).emit("action", {
                type: "toClient/OnlineChessGame/send_chat_msg",
                payload: `${user.name} left the game, so chat is off`
            });

            io.to(chessGame[opponentColor].socketId).emit("action", {
                type: "toClient/OnlineChessGame/game_over",
                payload: {
                    result,
                    reason: resultReason
                }
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
}

module.exports = handleUserDisconnect;