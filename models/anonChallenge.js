const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnonChallengeSchema = new Schema(
    {
        mode: String,
        time: String,
        challengerSocketId: String,
        challengerName: String,
        challengerId: String
    }
);

module.exports = mongoose.model('AnonChallenge', AnonChallengeSchema);