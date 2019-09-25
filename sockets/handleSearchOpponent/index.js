"use strict";

const ChessGame = require("../../models/chessGame.js");

const cryptoRandomString = require('crypto-random-string');

const handleSearchOpponent = async (io, socket, Challenge, room) => {

    socket.emit( "send_challenges_to_client", await Challenge.find({}) );

    socket.on("add_challenge", async (time, mode, challengerName) => {

        const foundChallenge = await Challenge.findOne({time: time, mode: mode});

        if(foundChallenge !== null) {
            const opponentSocketId = foundChallenge.challengerSocketId;
            await Challenge.findByIdAndRemove(foundChallenge._id);
            await io.to(room).emit("change_in_challenges", await Challenge.find({}));

            let chessGame = new ChessGame();
            chessGame.id = cryptoRandomString({length: 15});
            chessGame.turn = "w";
            chessGame.pgn = "";
            chessGame.time = time;
            const parsedTime =  time.split("+");
            const timeInMs = Number(parsedTime[0]) * 60 * 1000;
            const incInMs = Number(parsedTime[1]) * 1000;
            chessGame.timeInMs = timeInMs;
            chessGame.incInMs = incInMs;
            chessGame["w"].restOfTime = timeInMs;
            chessGame["b"].restOfTime = timeInMs;

            let playerColor;
            let opponentColor;
            if(Math.floor(Math.random()*2) === 0) {
                playerColor = "w";
                opponentColor = "b";
            } else {
                playerColor = "b";
                opponentColor = "w";
            }

            chessGame[playerColor].socketId = socket.id;
            chessGame[opponentColor].socketId = opponentSocketId;
            chessGame[playerColor].userName = challengerName;
            chessGame[opponentColor].userName = foundChallenge.challengerName;

            await chessGame.save();

            const playerOptions = {
                gameId: chessGame.id,
                color: playerColor
            };

            const opponentOptions = {
                gameId: chessGame.id,
                color: opponentColor
            };

            io.to(opponentSocketId).emit("start_game", opponentOptions);
            socket.emit("start_game", playerOptions);

            return;
        }

        const challenge = new Challenge();
        challenge.mode = mode;
        challenge.time = time;
        challenge.challengerName = challengerName;
        challenge.challengerSocketId = socket.id;
        await challenge.save();
        socket.emit("challenge_is_added", time, mode);
        io.to(room).emit( "change_in_challenges", await Challenge.find({}) );
    });

    socket.on("remove_challenge", async (time, mode) => {
        await Challenge.findOneAndRemove({
            mode: mode,
            time: time,
            challengerSocketId: socket.id
        });
        socket.emit("challenge_is_removed", time, mode);
        io.to(room).emit( "change_in_challenges", await Challenge.find({}) );
    });

    socket.on("disconnect", async () => {
        await Challenge.deleteMany({challengerSocketId: socket.id});
        io.to(room).emit( "change_in_challenges", await Challenge.find({}) );
    });

    socket.on("search_opponent_disconnect", async () => {
        await Challenge.deleteMany({challengerSocketId: socket.id});
        io.to(room).emit( "change_in_challenges", await Challenge.find({}) );
        socket.removeAllListeners("add_challenge");
        socket.removeAllListeners("remove_challenge");
        socket.removeAllListeners("search_opponent_disconnect");
        socket.removeAllListeners("disconnect");
    });
};

module.exports = handleSearchOpponent;