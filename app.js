const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = 'mongodb+srv://mposk:fjkjkzpj@cluster0-g09ah.mongodb.net/local_library?retryWrites=true&w=majority';
//const dev_db_url = 'mongodb://localhost:27017/webchess';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'client/dist/')));

app.use(cookieParser());
app.use(logger('dev'));

app.use("/", (req, res) => {
  res.sendFile('main.html', {root: path.join(__dirname, 'client/dist/')});
});

module.exports = app;
