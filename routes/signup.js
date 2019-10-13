const express = require('express');
const router = express.Router();
const User = require("../models/user.js");

router.get("/", (req, res) => {
    console.log("sign up get");
    res.redirect("/");
});

router.post("/", async (req, res) => {
    console.log("sign up post");
    if( await User.findOne({name: req.body.userName}) === null ) {
        const user = new User();
        user.name = req.body.userName;
        user.setPassword(req.body.password);
        await user.save();
        res.status(200).send("you are successfully registered, now you can log in");
    } else {
        res.status(422).send("this username is already in use");
    }
});

module.exports = router;