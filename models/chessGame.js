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
            socketId: String
        },
        "b": {
            restOfTime: Number,
            socketId: String
        }
    }
);

module.exports = mongoose.model('ChessGame', ChessGameSchema);