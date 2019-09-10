const anonSocketHandler = require("./anonSocketHandler.js");
// const gameroomSocket = require("./gameroom.js");
// const userSocketHandler = require("./user.js");
const cookieParser = require("cookie-parse");
const handleUserConnection = require("./handleUserConnection");
const handleAnonConnection = require("./handleAnonConnection");
 
function createSocketConnection(server) {
  const io = require("socket.io")(server);
  io.on("connection", function(socket) {
    const cookie = socket.handshake.headers.cookie;
    let user;
    let parsedCookie;
    if (cookie !== undefined) {
      parsedCookie = cookieParser.parse(cookie);
      user = parsedCookie.webchessUser;
    }

    if(user === undefined) {
      handleAnonConnection(io, socket, cookie);
    }

  }); 

  return io;
}

module.exports = createSocketConnection;