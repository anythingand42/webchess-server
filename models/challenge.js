const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    userId: String,
    userName: String,
    socketId: String,
    options: String
  }
);

//Export model
module.exports = mongoose.model('Challenge', ChallengeSchema);