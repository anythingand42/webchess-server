"use strict";

const User = require("../../../models/user");

const handleLogIn = async (socket) => {

    socket.on("log_in_attempt", async (data) => {
        const user = await User.findOne({name: data.userName});
        if( user !== null && user.validatePassword(data.password) ) {
            user.setToken();
            await user.save();
            socket.emit("log_in_answer", "success", user.getUserForClient());
        } else {
            socket.emit("log_in_answer", "invalid name or password");
        }
    });

    socket.on("log_in_disconnect", () => {
        socket.removeAllListeners("log_in_attempt");
        socket.removeAllListeners("log_in_disconnect");
    });

};

module.exports = handleLogIn;