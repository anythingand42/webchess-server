const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChessGameSchema = new Schema(
    {
        id: String,
        mode: String,
        pgn: String,
        timeInMs: Number,
        incInMs: Number,
        "w": {
            restOfTime: Number,
            socketId: String,
            disconnectFlag: Boolean,
            sendOptionsDate: Number
        },
        "b": {
            restOfTime: Number,
            socketId: String,
            disconnectFlag: Boolean,
            sendOptionsFlag: Number
        }
    }
);

module.exports = mongoose.model('ChessGame', ChessGameSchema);