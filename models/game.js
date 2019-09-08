const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StandartGameSchema = new Schema(
    {
        roomId: String,
        whiteSocketId: String,
        blackSocketId: String,
        fen: String,
        options: String
    }
);

module.exports = mongoose.model('StandartGame', StandartGameSchema);