const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        whitePlayerId: String,
        blackPlayerId: String,
        id: String
    }
);

//Export model
module.exports = mongoose.model('Room', RoomSchema);