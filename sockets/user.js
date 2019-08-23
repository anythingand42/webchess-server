"use strict";

const Challenge = require('../models/challenge');
const StandartGame = require('../models/game');
const User = require('../models/user');
const Player = require('../models/player');

const cookieParser = require("cookie-parse");
const cryptoRandomString = require('crypto-random-string');

const userSocketHandler = async (_io, _socket) => {
  let challenges = await Challenge.find({});
  _io.emit("change_challenge_list", challenges);

  let socket = _socket;
  let io = _io;
  socket.on("add_challenge", async (options) => {
    const cookie = cookieParser.parse(socket.handshake.headers.cookie);
    let user = cookie.webchessUser;

    if(user === undefined) return;

    user = JSON.parse(user);

    const found_challenge = await Challenge.findOne({options: options});

    if (found_challenge === null) {
      const challenge = new Challenge();

      challenge.userId = user.id;
      challenge.userName = user.name;
      challenge.options = options;
      challenge.socketId = socket.id;

      await challenge.save();

      let challenges = await Challenge.find({});

      io.emit("change_challenge_list", challenges);
    }
    else {
      if(found_challenge.userId === user.id) return;

      await Challenge.deleteOne(found_challenge);

      const standartGame = new StandartGame();
      standartGame.roomId = cryptoRandomString({length: 10});

      if( Math.floor(Math.random()*2) === 0) {
        standartGame.whiteSocketId = socket.id;
        standartGame.blackSocketId = found_challenge.socketId;
      } else {
        standartGame.whiteSocketId = found_challenge.socketId;
        standartGame.blackSocketId = socket.id;
      }

      await standartGame.save();

      let player1 = new Player();
      player1.roomId = String( Math.floor(Math.random() * 1000000) );

      let player2 = new Player();
      player2.roomId = String( Math.floor(Math.random() * 1000000) );

      if( Math.floor(Math.random()*2) === 0) {
        player1.color = "white";
        player2.color = "black";
      } else {
        player1.color = "black";
        player2.color = "white";
      }
      player1.opponentRoomId = player2.roomId;
      player2.opponentRoomId = player1.roomId;

      await player1.save();
      await player2.save();

      io.to(found_challenge.socketId).emit("start_game", "gameroom/" + player1.roomId);
      socket.emit("start_game", "gameroom/" + player2.roomId);

      // io.to(found_challenge.socketId).emit("start_game", "gameroom/" + standartGame.roomId);
      // socket.emit("start_game", "gameroom/" + standartGame.roomId);

    }
  });
};

module.exports = userSocketHandler;