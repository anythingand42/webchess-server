"use strict";

const User = require("../../models/user");

const handleSignUp = async (socket) => {

    socket.on("sign_up_attempt", async (data) => {
        if( await User.findOne({name: user.name}) === null ) {
            const user = new User();
            user.name = data.name;
            user.setPassword(data.password);
            await user.save();
            socket.emit("sign_up_answer", "success");
        } else {
            socket.emit("sign_up_answer", "this username is already in use");
        }
    });

    socket.on("sign_up_disconnect", () => {
        socket.removeAllListeners("sign_up_attempt");
        socket.removeAllListeners("sign_up_disconnect");
    });

};

module.exports = handleSignUp;