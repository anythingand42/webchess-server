"use strict";

const handleSearchOpponent = require("./handleSearchOpponent");
const handleChessGame = require("./handleChessGame");
const cookieParser = require("cookie-parse");
const ChessGame = require("../../models/chessGame.js");

const handleAnonConnection = async (io, socket, parsedCookie) => {

    socket.on("search_opponent_connection", async () => {
        if(parsedCookie && parsedCookie.webchessGame) {
            const webchessGame = JSON.parse(parsedCookie.webchessGame);
            const chessGame = await ChessGame.findOne({ id: webchessGame.gameId });

            const opponentColor = webchessGame.color === "b" ? "w" : "b";
            chessGame[webchessGame.color].socketId = socket.id;
            await chessGame.save();

            io.to(chessGame[opponentColor].socketId).emit("send_game_options_to_client", { opponentSocketId: socket.id });
            socket.emit("start_game");
        } else {
            await handleSearchOpponent(io, socket);
        }
    });

    socket.on("chess_game_connection", async (cookie) => {
        let parsedCookie;
        if (cookie) {
            parsedCookie = cookieParser.parse(cookie);
        }
        if(parsedCookie && parsedCookie.webchessGame) {
            const webchessGame = JSON.parse(parsedCookie.webchessGame);
            await handleChessGame(
                io,
                socket,
                webchessGame.gameId,
                webchessGame.color
            );
        }
    });
};

module.exports = handleAnonConnection;