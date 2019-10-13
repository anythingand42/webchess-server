module.exports = async function handleMount({ socket, user, room, Challenge }) {
    user.activeComponent = "SearchOpponent";
    await user.save();
    socket.join(room);
    socket.emit("action", {
        type: "toClient/SearchOpponent/send_challenges",
        payload: await Challenge.find({})
    });
}