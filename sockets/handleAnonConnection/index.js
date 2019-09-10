"use strict";

const AnonChallenge = require("../../models/anonChallenge.js");

const handleAnonConnection = async (io, socket, cookie) => {

    socket.on("get_challenges_from_sever", async () => {
        socket.emit( "send_challenges_to_client", await AnonChallenge.find({}) );
    });

    socket.on("add_challenge", async (time, mode) => {
        const challenge = new AnonChallenge();
        challenge.mode = mode;
        challenge.time = time;
        challenge.challengerSocketId = socket.id;
        await challenge.save();
        socket.emit("challenge_is_added", time, mode);
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
    });

    socket.on("remove_challenge", async (time, mode) => {
        await AnonChallenge.findOneAndRemove({
            mode: mode,
            time: time,
            challengerSocketId: socket.id
        });
        socket.emit("challenge_is_removed", time, mode);
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
    });

    socket.on("disconnect", async () => {
        await AnonChallenge.deleteMany({challengerSocketId: socket.id});
        io.emit( "change_in_challenges", await AnonChallenge.find({}) );
    });

};

module.exports = handleAnonConnection;