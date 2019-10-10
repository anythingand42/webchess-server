const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChessGameSchema = new Schema(
    {
        mode: String,
        pgn: String,
        timeInMs: Number,
        incInMs: Number,
        "w": {
            restOfTime: Number,
            socketId: String,
            userId: String,
            userName: String
        },
        "b": {
            restOfTime: Number,
            socketId: String,
            userId: String,
            userName: String
        },
        whiteToken: String,
        blackToken: String,
        isGameOver: Boolean,
        lastUpdateDate: Number,
        chatMessages: String
    }
);

module.exports = mongoose.model('ChessGame', ChessGameSchema);