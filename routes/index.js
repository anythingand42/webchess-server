const express = require('express');
const router = express.Router();
const path = require('path');
const User = require("../models/user.js");

router.get("/", async (req, res) => {
    const token = req.cookies ? req.cookies.webchessUser : null;
    if(!token) {
        const anonymous = new User();
        anonymous.setToken();
        await anonymous.save();
        res.cookie("anonymous", anonymous.getToken(), { maxAge: 1800000, httpOnly: true, sameSite: true });
    }
    res.sendFile('main.html', {root: path.join(__dirname, '../client/dist/')});
});

router.post("/", async (req, res) => {
    const token = req.cookies ? req.cookies.webchessUser : null;
    if(token) {
        const dbUser = await User.findOne({token});
        if(dbUser) {
            res.json({userName: dbUser.name});
            return;
        }
    } else {
        res.json({ userName: null });
    }
});

module.exports = router;