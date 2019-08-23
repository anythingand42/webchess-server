const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
  {
    socketId: String,
    roomId: String,
    opponentRoomId: String,
    color: String
  }
);

// // Virtual for author's full name
// AuthorSchema
// .virtual('name')
// .get(function () {
//   return this.family_name + ', ' + this.first_name;
// });

// // Virtual for author's lifespan
// AuthorSchema
// .virtual('lifespan')
// .get(function () {
//   return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
// });

// // Virtual for author's URL
// AuthorSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/author/' + this._id;
// });

//Export model
module.exports = mongoose.model('Player', PlayerSchema);