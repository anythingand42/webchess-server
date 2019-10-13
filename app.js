const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require("./routes/index.js");
const trainingroomRouter = require("./routes/trainingroom.js");
const gameroomRouter = require("./routes/gameroom.js");
const loginRouter = require("./routes/login.js");
const logoutRouter = require("./routes/logout.js");
const signupRouter = require("./routes/signup.js");

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = 'mongodb+srv://mposk:fjkjkzpj@cluster0-g09ah.mongodb.net/local_library?retryWrites=true&w=majority';
//const dev_db_url = 'mongodb://localhost:27017/webchess';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'client/dist/')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/trainingroom", trainingroomRouter);
app.use("/gameroom", gameroomRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

module.exports = app;
