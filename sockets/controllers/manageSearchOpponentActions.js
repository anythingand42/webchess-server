const ChessGame = require("../../models/chessGame.js");
const AnonChallenge = require("../../models/anonChallenge.js");
const UserChallenge = require("../../models/userChallenge.js");
const User = require("../../models/user.js");

async function manageSearchOpponentActions({ io, socket, payload, type, user }) {
    
    let room, Challenge;
    if(user.name) { 
        room = "users";
        Challenge = UserChallenge;
    }
    else {
        room = "anonymous";
        Challenge = AnonChallenge;
    }

    if(type === "unmount") {
        socket.leave(room);
        await Challenge.deleteMany({challengerSocketId: socket.id});
        io.to(room).emit("action", {
            type: "toClient/SearchOpponent/send_challenges",
            payload: await Challenge.find({})
        });
        return;
    }

    if(type === "connect") {
        socket.join(room);
        socket.emit("action", {
            type: "toClient/SearchOpponent/send_challenges",
            payload: await Challenge.find({})
        });
        return;
    }

    if(type === "add_challenge") {

        const foundChallenge = await Challenge.findOne({time: payload.time});

        if(foundChallenge !== null) {
            const opponentSocketId = foundChallenge.challengerSocketId;
            const opponent = await User.findById(foundChallenge.challengerId);

            await Challenge.deleteMany({challengerSocketId: socket.id});
            await Challenge.deleteMany({challengerSocketId: opponentSocketId});

            io.to(room).emit("action", {
                type: "toClient/SearchOpponent/send_challenges",
                payload: await Challenge.find({})
            });

            let chessGame = new ChessGame();
            chessGame.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            chessGame.time = payload.time;
            const parsedTime = payload.time.split("+");
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
            
            chessGame[playerColor].userName = user.name;
            chessGame[opponentColor].userName = opponent.name;

            chessGame[playerColor].userId = user._id;
            chessGame[opponentColor].userId = opponent._id;

            await chessGame.save();

            user.activeGameId = chessGame._id;
            user.activeGameColor = playerColor;
            await user.save();

            opponent.activeGameId = chessGame._id;
            opponent.activeGameColor = opponentColor;
            await opponent.save();
            
            io.to(opponentSocketId).emit("action", {
                type: "toClient/Main/start_game"
            });
            socket.emit("action", {
                type: "toClient/Main/start_game"
            });

            return;
        }

        const challenge = new Challenge();
        challenge.time = payload.time;
        challenge.challengerName = payload.challengerName;
        challenge.challengerSocketId = socket.id;
        challenge.challengerId = user._id;
        await challenge.save();
        socket.emit("action", { type: "toClient/SearchOpponent/challenge_request_is_processed", payload: payload.time });
        io.to(room).emit("action", {
            type: "toClient/SearchOpponent/send_challenges",
            payload: await Challenge.find({})
        });
        return;
    }

    if(type === "remove_challenge") {
        await Challenge.findOneAndDelete({
            time: payload.time,
            challengerSocketId: socket.id
        });
        socket.emit("action", { type: "toClient/SearchOpponent/challenge_request_is_processed", payload: payload.time });
        io.to(room).emit("action", {
            type: "toClient/SearchOpponent/send_challenges",
            payload: await Challenge.find({})
        });
        return;
    }
}

module.exports = manageSearchOpponentActions;