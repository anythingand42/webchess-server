const AnonChallenge = require("../../../models/anonChallenge.js");
const UserChallenge = require("../../../models/userChallenge.js");
const handleMount = require("./handleMount.js");
const handleUnmount = require("./handleUnmount.js");
const handleAddChallenge = require("./handleAddChallenge");
const handleRemoveChallenge = require("./handleRemoveChallenge.js");

const handlers = {
    "mount": handleMount,
    "unmount": handleUnmount,
    "add_challenge": handleAddChallenge,
    "remove_challenge": handleRemoveChallenge,
    "disconnect": handleUnmount
}

async function handleSearchOpponentAction({ io, socket, payload, type, user }) { 
    let room, Challenge;
    if(user.name) { 
        room = "users";
        Challenge = UserChallenge;
    } else {
        room = "anonymous";
        Challenge = AnonChallenge;
    }
    handlers[type]({ io, socket, payload, user, room, Challenge });
}

module.exports = handleSearchOpponentAction;