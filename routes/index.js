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
        res.sendFile('main.html', {root: path.join(__dirname, '../client/dist/')});
        return;
    }
    const user = await User.findOne({token: token});
    if(!user) {
        const anonymous = new User();
        anonymous.setToken();
        await anonymous.save();
        res.cookie("webchessUser", "", { maxAge: -1, httpOnly: true, sameSite: true });
        res.cookie("anonymous", anonymous.getToken(), { maxAge: 1800000, httpOnly: true, sameSite: true });
        res.sendFile('main.html', {root: path.join(__dirname, '../client/dist/')});
        return;
    }
    res.sendFile('main.html', {root: path.join(__dirname, '../client/dist/')});
});

router.post("/", async (req, res) => {
    const token = req.cookies ? req.cookies.webchessUser : null;
    if(!token) {
        res.json({ userName: null });
        return;
    }

    const dbUser = await User.findOne({token: token});
    if(!dbUser) {
        res.json({ userName: null });
        return;
    }

    res.json({userName: dbUser.name});
});

module.exports = router;