"use strict";

const ChessGame = require("../../../models/chessGame.js");

const handleChessGame = async (io, socket, gameId, color) => {

    socket.removeAllListeners("send_move_to_server");
    socket.removeAllListeners("game_over");

    const opponentColor = color === "b" ? "w" : "b";
    const chessGame = await ChessGame.findOne({ id: gameId});
    const options = {
        mode: chessGame.mode,
        pgn: chessGame.pgn,
        timeInMs: chessGame.timeInMs,
        incInMs: chessGame.incInMs,
        whiteRestOfTime: chessGame["w"].restOfTime,
        blackRestOfTime: chessGame["b"].restOfTime,
        orientation: color,
        opponentSocketId: chessGame[opponentColor].socketId
    };
    socket.emit("send_game_options_to_client", options);

    socket.on("send_move_to_server", async (data) => {
        try {
            chessGame.pgn = data.pgn;
            chessGame["w"].restOfTime = data.whiteRestOfTime;
            chessGame["b"].restOfTime = data.blackRestOfTime;
            await chessGame.save();
            io.to(data.opponentSocketId).emit("send_move_to_client", data);
        } catch(err) {
            console.log("Error in: event 'send_move_to_server'", err);
        }
    });

    socket.on("game_over", async (data) => {
        try {
            await ChessGame.findOneAndDelete({id: gameId});
            await socket.removeAllListeners("send_move_to_server");
            await socket.removeAllListeners("game_over");
            io.to(data.opponentSocketId).emit("game_over", { result: data.result });
            socket.emit("game_over", { result: data.result });
        } catch(err) {
            console.log("Error in: event 'game_over'", err);
        }
    });
};

module.exports = handleChessGame;