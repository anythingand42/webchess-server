const handleAnonDisconnect = require("./handleAnonDisconnect.js");
const handleUserDisconnect = require("./handleUserDisconnect.js");

module.exports = async function handleDisconnect({io, chessGame, opponentColor, user}) {
    if(user.name) {
        handleUserDisconnect({io, user});
    } else {
        handleAnonDisconnect({io, chessGame, opponentColor, user});
    }
}