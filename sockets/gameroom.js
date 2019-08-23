let Player = require('../models/player');

let gameroomSocket = async (io, socket, id) => {
  let player = await Player.findOne({roomId: id});
  player.socketId = socket.id;
  await player.save();
  socket.emit("send_color_to_client", player.color);

  socket.on("send_move_to_server", async (moveMsg, specialMsg, enpassantId) => {
    let opponent = await Player.findOne({roomId: player.opponentRoomId});
    io.to(opponent.socketId).emit("send_move_to_client", moveMsg, specialMsg, enpassantId);
    //console.log("to " + opponent.socketId + " " + moveMsg);
  });

  socket.on("disconnect", async () => {
    let opponent = await Player.findOne({roomId: player.opponentRoomId});

    await Player.deleteOne({roomId: id});
    if(opponent !== null) {
      io.to(opponent.socketId).emit("opponent_is_disconnected");
    }

  });
};

module.exports = gameroomSocket;