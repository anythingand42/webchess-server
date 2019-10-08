const mongoose = require('mongoose');
const cryptoRandomString = require('crypto-random-string');

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
            disconnectFlag: Boolean,
            userId: String,
            userName: String
        },
        "b": {
            restOfTime: Number,
            socketId: String,
            disconnectFlag: Boolean,
            userId: String,
            userName: String
        },
        whiteToken: String,
        blackToken: String,
        isGameOver: Boolean,
        lastUpdateDate: Number
    }
);

ChessGameSchema.methods.setTokens = function() {
    this.whiteToken = cryptoRandomString({length: 20});
    this.blackToken = cryptoRandomString({length: 20});
};

ChessGameSchema.methods.getToken = function(color) {
    if(color === "w") return this.whiteToken;
    if(color === "b") return this.blackToken;
};

module.exports = mongoose.model('ChessGame', ChessGameSchema);