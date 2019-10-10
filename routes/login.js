const express = require('express');
const router = express.Router();
const path = require('path');
const User = require("../models/user.js");

router.get("/", (req, res) => {
    res.redirect("/");
});

router.post("/", async (req, res) => {
    const user = await User.findOne({name: req.body.userName});
    if( user !== null && user.validatePassword(req.body.password) ) {
        if(user.isSessionActive) {
            res.status(422).send("you already have an active session");
            return;
        }
        user.isSessionActive = true;
        user.setToken();
        await user.save();
        res.cookie("anonymous", null, { maxAge: -1 });
        res.cookie("webchessUser", user.getToken(), { maxAge: 1800000, httpOnly: true, sameSite: true });
        res.sendStatus(200);
    } else {
        res.status(422).send("invalid username or password");
    }
});

module.exports = router;