const ChessGame = require("../../models/chessGame.js");
const User = require("../../models/user.js");

async function manageOnlineChessGameActions({ io, socket, payload, type, user }) {
    
    if(!user.activeGameId) return;
    const chessGame = await ChessGame.findById(user.activeGameId);
    if(!chessGame) return;
    const color = user.activeGameColor;

    if(type === "user_left") {
        if(!chessGame.isGameOver) return;
        const opponentColor = color === "b" ? "w" : "b";

        const opponent = await User.findById(chessGame[opponentColor].userId);
        opponent.activeGameId = null;
        opponent.activeGameColor = null;

        user.activeGameId = null;
        user.activeGameColor = null;

        let msg;
        if(user.name) {
            msg = `${user.name} left the game, so chat is off`;
        } else {
            const turn = color === "w" ? "white" : "black";
            msg = `${turn} left the game, so chat is off`;
        }

        await Promise.all([
            opponent.save(),
            user.save(),
            chessGame.remove()
        ]);

        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/send_chat_msg",
            payload: msg
        });

        return;
    }

    if(type === "connect") {
        if(chessGame.isGameOver) return;

        const options = {
            fen: chessGame.fen,
            pgn: chessGame.pgn,
            incInMs: chessGame.incInMs,
            whiteRestOfTime: chessGame["w"].restOfTime,
            blackRestOfTime: chessGame["b"].restOfTime,
            orientation: color,
            lastUpdateDate: chessGame.lastUpdateDate,
            whiteUserName: chessGame["w"].userName,
            blackUserName: chessGame["b"].userName,
            chatMessages: chessGame.chatMessages
        };

        socket.emit("action", {
            type: "toClient/OnlineChessGame/send_game_options",
            payload: options
        });

        return;
    }

    if(type === "send_move") {
        if(chessGame.isGameOver) return;

        const opponentColor = color === "b" ? "w" : "b";
        const data = payload;

        chessGame.fen = data.fen;
        chessGame.pgn = data.pgn;
        chessGame["w"].restOfTime = data.whiteRestOfTime;
        chessGame["b"].restOfTime = data.blackRestOfTime;
        chessGame.lastUpdateDate = new Date().getTime();
        await chessGame.save();
        
        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/send_move",
            payload: data
        });

        return;
    }

    if(type === "game_over") {
        if(chessGame.isGameOver) return;
        chessGame.isGameOver = true;
        await chessGame.save();

        const opponentColor = color === "b" ? "w" : "b";

        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/game_over",
            payload: payload
        });

        return;
    }

    if(type === "send_chat_msg") {
        if(user.name) {
            chessGame.chatMessages = `${chessGame.chatMessages || ""}${payload}\n`;
            await chessGame.save();
        }
        const opponentColor = color === "b" ? "w" : "b";
        socket.emit("action", {
            type: "toClient/OnlineChessGame/send_chat_msg",
            payload: payload
        });
        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/send_chat_msg",
            payload: payload
        });

        return;
    }

}

module.exports = manageOnlineChessGameActions;