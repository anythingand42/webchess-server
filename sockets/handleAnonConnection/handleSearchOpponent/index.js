"use strict";

const AnonChallenge = require("../../../models/anonChallenge.js");
const ChessGame = require("../../../models/chessGame.js");

const cryptoRandomString = require('crypto-random-string');

const handleSearchOpponent = async (io, socket) => {

    socket.removeAllListeners("add_challenge");
    socket.removeAllListeners("remove_challenge");
    socket.removeAllListeners("disconnect");
    socket.removeAllListeners("search_opponent_disconnect");

    socket.emit( "send_challenges_to_client", await AnonChallenge.find({}) );

    socket.on("add_challenge", async (time, mode) => {

        const found_challenge = await AnonChallenge.findOne({time: time, mode: mode});

        if(found_challenge !== null) {
            const opponentSocketId = found_challenge.challengerSocketId;
            await AnonChallenge.findByIdAndRemove(found_challenge._id);
            await io.emit("change_in_challenges", await AnonChallenge.find({}));

            let chessGame = new ChessGame();
            chessGame.id = cryptoRandomString({length: 15});
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

        const challenge = new AnonChallenge();
        challenge.mode = mode;
        challenge.time = time;
        challenge.challengerSocketId = socket.id;
        await challenge.save();
        socket.emit("challenge_is_added", time, mode);
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
    });

    socket.on("remove_challenge", async (time, mode) => {
        await AnonChallenge.findOneAndRemove({
            mode: mode,
            time: time,
            challengerSocketId: socket.id
        });
        socket.emit("challenge_is_removed", time, mode);
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
    });

    socket.on("disconnect", async () => {
        await AnonChallenge.deleteMany({challengerSocketId: socket.id});
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
    });

    socket.on("search_opponent_disconnect", async () => {
        await AnonChallenge.deleteMany({challengerSocketId: socket.id});
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
        socket.removeAllListeners("add_challenge");
        socket.removeAllListeners("remove_challenge");
        socket.removeAllListeners("disconnect");
        socket.removeAllListeners("search_opponent_disconnect");
    });
};

module.exports = handleSearchOpponent;