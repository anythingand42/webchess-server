const ChessGame = require("../../models/chessGame.js");

async function manageOnlineChessGameActions({ io, socket, payload, type, user }) {
    // const { io, socket, payload, type, user } = args;
    
    if(!user.activeGameId) return;
    const chessGame = await ChessGame.findById(user.activeGameId);
    if(!chessGame) return;
    const color = user.activeGameColor;

    if(type === "connect") {

        const options = {
            pgn: chessGame.pgn,
            incInMs: chessGame.incInMs,
            whiteRestOfTime: chessGame["w"].restOfTime,
            blackRestOfTime: chessGame["b"].restOfTime,
            orientation: color,
            lastUpdateDate: chessGame.lastUpdateDate,
            whiteUserName: chessGame["w"].userName,
            blackUserName: chessGame["b"].userName
        };

        socket.emit("action", {
            type: "toClient/OnlineChessGame/send_game_options",
            payload: options
        });

        return;
    }

    if(type === "send_move") {

        console.log(chessGame);
        const opponentColor = color === "b" ? "w" : "b";
        const data = payload;

        chessGame.pgn = data.pgn;
        chessGame["w"].restOfTime = data.whiteRestOfTime;
        chessGame["b"].restOfTime = data.blackRestOfTime;
        chessGame.lastUpdateDate = new Date().getTime();
        await chessGame.save();

        console.log(chessGame[color].socketId);
        io.to(chessGame[opponentColor].socketId).emit("action", {
            type: "toClient/OnlineChessGame/send_move",
            payload: data
        });

        return;
    }

}

module.exports = manageOnlineChessGameActions;