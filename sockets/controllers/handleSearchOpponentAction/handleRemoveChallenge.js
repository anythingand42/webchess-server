module.exports = async function handleRemoveChallenge({ io, socket, payload, user, room, Challenge }) {
    await Challenge.findOneAndDelete({
        time: payload.time,
        challengerSocketId: socket.id
    });
    socket.emit("action", { type: "toClient/SearchOpponent/challenge_request_is_processed", payload: payload.time });
    io.to(room).emit("action", {
        type: "toClient/SearchOpponent/send_challenges",
        payload: await Challenge.find({})
    });
}