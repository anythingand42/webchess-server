const express = require('express');
const router = express.Router();
const User = require("../models/user.js");

router.get("/", (req, res) => {
    console.log("log in get");
    res.redirect("/");
});

router.post("/", async (req, res) => {
    console.log("log in post");
    const user = await User.findOne({name: req.body.userName});
    if( user && user.validatePassword(req.body.password) ) {
        user.setToken();
        await user.save();
        res.cookie("anonymous", "", { maxAge: -1 });
        res.cookie("webchessUser", user.getToken(), { maxAge: 1800000, httpOnly: true, sameSite: true });
        res.sendStatus(200);
    } else {
        res.status(422).send("invalid username or password");
    }
});

module.exports = router;