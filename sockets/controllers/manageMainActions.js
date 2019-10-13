const ChessGame = require("../../models/chessGame.js");
const handlers = {
    "mount": handleMount,
}

function manageMainActions({io, socket, payload, type, user}) {
    handlers[type]({io, socket, payload, type, user});
}

async function handleMount({socket, user}) {
    if(user.activeGameId) {
        const chessGame = await ChessGame.findById(user.activeGameId); //мб перенести в хэндлер OnlineChessGame эти 3 строчки
        chessGame[user.activeGameColor].socketId = socket.id;
        await chessGame.save();
        socket.emit("action", {
            type: "toClient/Main/start_game"
        });
    }
}

module.exports = manageMainActions;