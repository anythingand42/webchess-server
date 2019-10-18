const ChessGame = require("../../models/chessGame.js");
const handlers = {
    "mount": handleMount,
}

function handleMainAction({io, socket, payload, type, user}) {
    handlers[type]({io, socket, payload, type, user});
}

async function handleMount({socket, user}) {
    if(!user.activeGameId) return;
    const chessGame = await ChessGame.findById(user.activeGameId); //мб перенести в хэндлер OnlineChessGame эти 3 строчки
    if(!chessGame) throw new Error("can't find chess game by activeGameId");
    chessGame[user.activeGameColor].socketId = socket.id;
    await chessGame.save();
    socket.emit("action", {
        type: "toClient/Main/start_game"
    });
}

module.exports = handleMainAction;