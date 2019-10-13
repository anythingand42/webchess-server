const handleGameCreation = require("./handleGameCreation.js");
const User = require("../../../../models/user.js");

module.exports = async function handleAddChallenge({ io, socket, payload, user, room, Challenge }) {
    const foundChallenge = await Challenge.findOne({time: payload.time});

    if(foundChallenge) {
        const opponentSocketId = foundChallenge.challengerSocketId;
        const opponent = await User.findById(foundChallenge.challengerId);

        await Challenge.deleteMany({challengerSocketId: socket.id});
        await Challenge.deleteMany({challengerSocketId: opponentSocketId});

        io.to(room).emit("action", {
            type: "toClient/SearchOpponent/send_challenges",
            payload: await Challenge.find({})
        });

        handleGameCreation({ io, gameOptions: payload, user, opponent, opponentSocketId, socket});

        return;
    }

    const challenge = new Challenge();
    challenge.time = payload.time;
    challenge.challengerName = payload.challengerName;
    challenge.challengerSocketId = socket.id;
    challenge.challengerId = user._id;
    await challenge.save();
    socket.emit("action", { type: "toClient/SearchOpponent/challenge_request_is_processed", payload: payload.time });
    io.to(room).emit("action", {
        type: "toClient/SearchOpponent/send_challenges",
        payload: await Challenge.find({})
    });
}