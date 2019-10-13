const ChessGame = require("../../../../models/chessGame.js");

module.exports = async function handleGameCreation({ io, gameOptions, user, opponent, opponentSocketId, socket}) {
    const chessGame = new ChessGame();
    chessGame.pgn = "";
    chessGame.time = gameOptions.time;
    const parsedTime = gameOptions.time.split("+");
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
}