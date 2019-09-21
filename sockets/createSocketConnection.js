const cookieParser = require("cookie-parse");
const handleUserConnection = require("./handleUserConnection");
const handleAnonConnection = require("./handleAnonConnection");

function createSocketConnection(server) {
    const io = require("socket.io")(server);
    io.on("connection", function(socket) {
        const cookie = socket.handshake.headers.cookie;
        let user;
        let parsedCookie;
        if (cookie) {
            parsedCookie = cookieParser.parse(cookie);
            user = parsedCookie.webchessUser;
        }

        if(user) {

        } else {
            handleAnonConnection(io, socket, parsedCookie);
        }

    });

    return io;
}

module.exports = createSocketConnection;