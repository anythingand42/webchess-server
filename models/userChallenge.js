const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserChallengeSchema = new Schema(
    {
        mode: String,
        time: String,
        challengerSocketId: String,
        challengerName: String
    }
);

module.exports = mongoose.model('UserChallenge', UserChallengeSchema);