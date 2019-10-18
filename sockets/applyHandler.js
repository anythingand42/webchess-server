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
    console.log(action, socket.request.headers.cookie);
    if(!user) user = await getUserByCookie(socket.request.headers.cookie);
    if(!user) {
        console.log("can't get user by cookie");
        socket.emit("action", {
            type: "toClient/Main/refresh_window"
        });
        return;
    }
    const splittedActionType = action.type.split("/");
    const component = splittedActionType[1];
    const type = splittedActionType[2];
    const payload = action.payload;

    handlers[component]({ io, socket, payload, type, user });
}

module.exports = applyHandler;