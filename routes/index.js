const express = require('express');
const router = express.Router();
const path = require('path');
const User = require("../models/user.js");

async function handleAnonConnection(res) {
    const anonymous = new User();
    anonymous.setToken();
    await anonymous.save();
    await res.cookie("webchessUser", "", { maxAge: -1, httpOnly: true, sameSite: true }); // работают ли эти await
    await res.cookie("anonymous", anonymous.getToken(), { maxAge: 1800000, httpOnly: true, sameSite: true });
    res.sendFile('main.html', {root: path.join(__dirname, '../client/dist/')});
}

async function handleUserConnection(res, user) {
    user.isSessionActive = true;
    await user.save();
    res.sendFile('main.html', {root: path.join(__dirname, '../client/dist/')});
}

router.get("/", async (req, res) => {
    console.log("index get");
    const token = req.cookies ? req.cookies.webchessUser : null;
    if(!token) {
        handleAnonConnection(res);
        return;
    }
    const user = await User.findOne({token});
    if(!user || user.isSessionActive) {
        handleAnonConnection(res);
        return;
    }
    handleUserConnection(res, user);
});

router.post("/", async (req, res) => {
    console.log("index post");
    const token = req.cookies ? req.cookies.webchessUser : null;
    if(!token) {
        res.json({ userName: null });
        return;
    }
    const user = await User.findOne({token});
    if(!user) {
        res.json({ userName: null });
        return;
    }
    res.json({userName: user.name});
});

module.exports = router;