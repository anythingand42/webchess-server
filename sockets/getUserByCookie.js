"use strict";
const cookieParser = require("cookie-parse");
const User = require("../models/user.js");

async function getUserByCookie(cookie) {
    if(!cookie) return null;

    let user;
    if (cookie) {
        const parsedCookie = cookieParser.parse(cookie);
        const userToken = parsedCookie.webchessUser;
        const anonToken = parsedCookie.anonymous;
        if(userToken) {
            user = await User.findOne({ token: userToken });
            if(!user.isConnected) {
                user.isConnected = true;
                await user.save();
            }
        }
        if(anonToken) user = await User.findOne({ token: anonToken })
    }
    
    return user;
}

module.exports = getUserByCookie;