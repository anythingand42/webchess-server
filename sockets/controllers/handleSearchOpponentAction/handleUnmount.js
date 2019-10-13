module.exports = async function handleUnmount({ io, socket, room, Challenge }) {
    socket.leave(room);
    await Challenge.deleteMany({challengerSocketId: socket.id});
    io.to(room).emit("action", {
        type: "toClient/SearchOpponent/send_challenges",
        payload: await Challenge.find({})
    });
}