const anonSocketHandler = require("./anonSocketHandler.js");
// const gameroomSocket = require("./gameroom.js");
// const userSocketHandler = require("./user.js");
const cookieParser = require("cookie-parse");
const handleUserConnection = require("./handleUserConnection");
const handleAnonConnection = require("./handleAnonConnection");
 
function createSocketConnection(server) {
  const io = require("socket.io")(server);
  io.on("connection", function(socket) {
    let cookie = socket.handshake.headers.cookie;
    let user;
    if (cookie !== undefined) {
      cookie = cookieParser.parse(socket.handshake.headers.cookie);
      user = cookie.webchessUser;
    }

    // if(user === undefined) {
    //   anonSocketHandler(io, socket, cookie);
    // }

    if(user === undefined) {
      handleAnonConnection(io, socket, cookie);
    }

    if(user) {

    }

  }); 

  return io;
}

module.exports = createSocketConnection;