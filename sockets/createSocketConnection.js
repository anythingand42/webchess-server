const anonSocketHandler = require("./anonSocketHandler.js");
// const gameroomSocket = require("./gameroom.js");
// const userSocketHandler = require("./user.js");
const cookieParser = require("cookie-parse");
const cryptoRandomString = require('crypto-random-string');
 
function createSocketConnection(server) {
  const io = require("socket.io")(server);
  io.on("connection", function(socket) {
    let cookie = socket.handshake.headers.cookie;
    let user;
    if (cookie !== undefined) {
      cookie = cookieParser.parse(socket.handshake.headers.cookie);
      user = cookie.webchessUser;
    }

    if(user === undefined) {
      anonSocketHandler(io, socket, cookie);
    }

    // socket.on("add_challenge", () => {
    //   const cookie = cookieParser.parse(socket.handshake.headers.cookie);
    //   let user = cookie.webchessUser;
    //
    //   if(user === undefined) {
    //     anonSocketHandler(io, socket);
    //   }
    //
    // });

    // socket.on("url(anon)_connect", () => {
    //   anonSocket(io, socket);
    // });
    //
    // socket.on("url(gameroom)_connect", (id) => {
    //   gameroomSocket(io, socket, id);
    // });
    //
    // socket.on("user", () => {
    //   userSocketHandler(io, socket);
    // });

    // socket.emit("which_url");

  }); 

  return io;
}

module.exports = createSocketConnection;