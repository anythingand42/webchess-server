const cookieParser = require("cookie-parse");
const handleUserConnection = require("./handleUserConnection");
const handleAnonConnection = require("./handleAnonConnection");

function createSocketConnection(server) {
    const io = require("socket.io")(server);
    io.on("connection", function(socket) {
        const cookie = socket.handshake.headers.cookie;
        let user;
        let parsedCookie;
        let webchessGame;
        if (cookie) {
            parsedCookie = cookieParser.parse(cookie);
            user = parsedCookie.webchessUser;
            webchessGame = parsedCookie.webchessGame;
        }

        const anonRoomName = "anonymous";
        const userRoomName = "users";

        if(user) {
            handleUserConnection(io, socket, userRoomName);
        } else {
            handleAnonConnection(io, socket, anonRoomName);
        }

    });

    return io;
}

module.exports = createSocketConnection;