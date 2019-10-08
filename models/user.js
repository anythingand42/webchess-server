"use strict";

const cryptoRandomString = require('crypto-random-string');

const mongoose = require('mongoose');
const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    hash: String,
    salt: String,
    token: String,
    activeGameId: String,
    activeGameColor: String
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setToken = function() {
    this.token = cryptoRandomString({length: 20});
};

UserSchema.methods.getToken = function() {
    return this.token;
};

// UserSchema.methods.getUserForClient = function() {
//     return {
//         id: this._id,
//         token: this.token,
//         name: this.name
//     }
// };

// UserSchema.methods.generateJWT = function() {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   return jwt.sign({
//     name: this.name,
//     id: this._id,
//     exp: parseInt(expirationDate.getTime() / 1000, 10),
//   }, 'secret');
// }

// UserSchema.methods.toAuthJSON = function() {
//   return {
//     _id: this._id,
//     name: this.name,
//     token: this.generateJWT(),
//   };
// };

module.exports = mongoose.model('User', UserSchema);