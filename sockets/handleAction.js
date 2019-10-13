"use strict";

const getUserByCookie = require("./getUserByCookie.js");
const manageMainActions = require("./controllers/manageMainActions");
const handleSearchOpponentAction = require("./controllers/handleSearchOpponentAction");
const manageOnlineChessGameActions = require("./controllers/manageOnlineChessGameActions");
const controllers = {
    "Main": manageMainActions,
    "SearchOpponent": handleSearchOpponentAction,
    "OnlineChessGame": manageOnlineChessGameActions
}

async function handleAction({action, io, socket}) {
    console.log(action, socket.request.headers.cookie);
    const user = await getUserByCookie(socket.request.headers.cookie);
    if(!user) throw new Error("can't get user by cookie");
    const splittedActionType = action.type.split("/");
    const component = splittedActionType[1];
    const type = splittedActionType[2];
    const payload = action.payload;

    controllers[component]({ io, socket, payload, type, user });
}

module.exports = handleAction;