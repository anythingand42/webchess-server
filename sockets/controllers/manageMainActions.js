const ChessGame = require("../../models/chessGame.js");

async function manageMainActions({io, socket, payload, type, user}) {
    console.log(user);
    if(type === "connect") {
        socket.emit("action", { type: "toClient/Main/connected" });

        if(user.activeGameId) {
            const chessGame = await ChessGame.findById(user.activeGameId);
            chessGame[user.activeGameColor].socketId = socket.id;
            await chessGame.save();
            socket.emit("action", {
                type: "toClient/Main/start_game"
            });
        }

        return;
    }

}

module.exports = manageMainActions;