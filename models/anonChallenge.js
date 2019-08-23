const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const AnonChallengeSchema = new Schema(
    {
        anonId: String,
        options: String
    }
);

module.exports = mongoose.model('AnonChallenge', AnonChallengeSchema);