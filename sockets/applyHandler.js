"use strict";

const getUserByCookie = require("./getUserByCookie.js");
const handleMainAction = require("./controllers/handleMainAction.js");
const handleSearchOpponentAction = require("./controllers/handleSearchOpponentAction");
const handleOnlineChessGameAction = require("./controllers/handleOnlineChessGameAction");
const handlers = {
    "Main": handleMainAction,
    "SearchOpponent": handleSearchOpponentAction,
    "OnlineChessGame": handleOnlineChessGameAction
}

async function applyHandler({action, io, socket, user}) {
    const splittedActionType = action.type.split("/");
    const component = splittedActionType[1];
    const type = splittedActionType[2];
    const payload = action.payload;

    handlers[component]({ io, socket, payload, type, user });
}

module.exports = applyHandler;