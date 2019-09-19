"use strict";

const ChessGame = require("../../../models/chessGame.js");

const handleChessGame = async (io, socket, gameId, color) => {

    // socket.removeAllListeners("send_move_to_server");
    // socket.removeAllListeners("game_over");
    // socket.removeAllListeners("standard_chess_game_disconnect");
    // socket.removeAllListeners("disconnect");

    const opponentColor = color === "b" ? "w" : "b";
    const chessGame = await ChessGame.findOne({ id: gameId });
    let isGameOver = false;

    // let restOfTime = {
    //     "w": chessGame["w"].restOfTime,
    //     "b": chessGame["b"].restOfTime
    // };

    if(chessGame[color].disconnectFlag) {
        const delta = new Date().getTime() - chessGame[color].sendOptionsDate;
        if(chessGame.turn === color) {
            chessGame[color].restOfTime = chessGame[color].restOfTime - delta - 200;
            // restOfTime[color] = chessGame[color].restOfTime;
        }
        chessGame[color].disconnectFlag = false;
        await chessGame.save();
    }

    const options = {
        mode: chessGame.mode,
        pgn: chessGame.pgn,
        incInMs: chessGame.incInMs,
        whiteRestOfTime: chessGame["w"].restOfTime,
        blackRestOfTime: chessGame["b"].restOfTime,
        orientation: color,
        opponentSocketId: chessGame[opponentColor].socketId
    };
    chessGame[color].sendOptionsDate = new Date().getTime();
    await chessGame.save();

    socket.emit("send_game_options_to_client", options);

    socket.on("send_move_to_server", async (data) => {
        try {
            chessGame.pgn = data.pgn;
            chessGame.turn = data.turn;
            chessGame["w"].restOfTime = data.whiteRestOfTime;
            chessGame["b"].restOfTime = data.blackRestOfTime;
            chessGame[opponentColor].sendOptionsDate = new Date().getTime();
            await chessGame.save();
            io.to(data.opponentSocketId).emit("send_move_to_client", data);
        } catch(err) {
            console.log("Error in: event 'send_move_to_server'", err);
        }
    });

    socket.on("game_over", async (data) => {
        try {
            isGameOver = true;
            await ChessGame.findOneAndDelete({id: gameId});
            socket.removeAllListeners("send_move_to_server");
            socket.removeAllListeners("game_over");
            socket.removeAllListeners("standard_chess_game_disconnect");
            socket.removeAllListeners("disconnect");
            io.to(data.opponentSocketId).emit("game_over", { result: data.result });
            socket.emit("game_over", { result: data.result });
        } catch(err) {
            console.log("Error in: event 'game_over'", err);
        }
    });

    socket.on("standard_chess_game_disconnect", async () => {
        try {
            socket.removeAllListeners("send_move_to_server");
            socket.removeAllListeners("game_over");
            socket.removeAllListeners("standard_chess_game_disconnect");
            socket.removeAllListeners("disconnect");
            if(!isGameOver) {
                chessGame[color].disconnectFlag = true;
                await chessGame.save();
            }
        } catch(err) {
            console.log("Error in: event 'standard_chess_game_disconnect'", err);
        }
    });

    socket.on("disconnect", async () => {
        if(!isGameOver) {
            chessGame[color].disconnectFlag = true;
            await chessGame.save();
        }
    });
};

module.exports = handleChessGame;