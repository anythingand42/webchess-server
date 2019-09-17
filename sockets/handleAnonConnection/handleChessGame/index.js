"use strict";

const ChessGame = require("../../../models/chessGame.js");

const handleChessGame = async (io, socket, gameId, color) => {

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
        chessGame.pgn = data.pgn;
        await chessGame.save();
        io.to(data.opponentSocketId).emit("send_move_to_client", data.idFrom, data.idTo);
    });
};

module.exports = handleChessGame;