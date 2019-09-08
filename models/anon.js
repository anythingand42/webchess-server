const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnonSchema = new Schema(
    {
        socketId: String,
        token: String,
        activeRoomId: String,
        activeColor: String,
        activeGame: {
            roomId: String,
            color: String,
            restOfTime: Number,
            inc: Number
        }
    }
);

module.exports = mongoose.model('Anon', AnonSchema);