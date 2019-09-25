const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChessGameSchema = new Schema(
    {
        id: String,
        mode: String,
        pgn: String,
        timeInMs: Number,
        incInMs: Number,
        turn: String,
        "w": {
            restOfTime: Number,
            socketId: String,
            disconnectFlag: Boolean,
            userName: String
        },
        "b": {
            restOfTime: Number,
            socketId: String,
            disconnectFlag: Boolean,
            userName: String
        },
        isGameOver: Boolean,
        lastUpdateDate: Number
    }
);

module.exports = mongoose.model('ChessGame', ChessGameSchema);