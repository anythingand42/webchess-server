"use strict";

const ChessGame = require("../../models/chessGame.js");

const handleChessGame = async (io, socket, gameId, color) => {

    const opponentColor = color === "b" ? "w" : "b";
    const chessGame = await ChessGame.findOne({ id: gameId });
    const options = {
        mode: chessGame.mode,
        game: {
            pgn: chessGame.pgn,
            incInMs: chessGame.incInMs,
            whiteRestOfTime: chessGame["w"].restOfTime,
            blackRestOfTime: chessGame["b"].restOfTime,
            orientation: color,
            lastUpdateDate: chessGame.lastUpdateDate,
            whiteUserName: chessGame["w"].userName,
            blackUserName: chessGame["b"].userName,
        },
        opponentSocketId: chessGame[opponentColor].socketId,
    };

    socket.emit("send_game_options_to_client", options);

    socket.on("send_chat_msg_to_server", (msg, opponentSocketId) => {
        io.to(opponentSocketId).emit("send_chat_msg_to_client", msg);
    });

    socket.on("send_move_to_server", async (data) => {
        try {
            chessGame.pgn = data.pgn;
            chessGame.turn = data.turn;
            chessGame["w"].restOfTime = data.whiteRestOfTime;
            chessGame["b"].restOfTime = data.blackRestOfTime;
            chessGame.lastUpdateDate = new Date().getTime();
            await chessGame.save();
            io.to(data.opponentSocketId).emit("send_move_to_client", data);
        } catch(err) {
            console.log("Error in: event 'send_move_to_server'", err);
        }
    });

    socket.on("game_over", async (data) => {
        try {
            await ChessGame.findOneAndDelete({id: gameId});
            socket.removeAllListeners("send_move_to_server");
            socket.removeAllListeners("game_over");
            socket.removeAllListeners("standard_chess_game_disconnect");
            io.to(data.opponentSocketId).emit("game_over", { result: data.result });
            socket.emit("game_over", { result: data.result });
        } catch(err) {
            console.log("Error in: event 'game_over'", err);
        }
    });

    socket.on("standard_chess_game_disconnect", async () => {
        socket.removeAllListeners("send_move_to_server");
        socket.removeAllListeners("game_over");
        socket.removeAllListeners("standard_chess_game_disconnect");
    });
};

module.exports = handleChessGame;