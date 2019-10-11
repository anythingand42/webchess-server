"user strict";

const manageMainActions = require("./controllers/manageMainActions");
const manageSearchOpponentActions = require("./controllers/manageSearchOpponentActions");
const manageOnlineChessGameActions = require("./controllers/manageOnlineChessGameActions");

function handleAction({action, io, socket, user}) {

    const splittedActionType = action.type.split("/");
    const component = splittedActionType[1];
    const type = splittedActionType[2];
    const payload = action.payload;
    
    const options = { io, socket, payload, type, user };

    switch(component) {
        case "Main": {
            manageMainActions(options);
            break;
        }
        case "SearchOpponent": {
            manageSearchOpponentActions(options);
            break;
        }
        case "OnlineChessGame": {
            manageOnlineChessGameActions(options);
            break;
        }
    }
}

module.exports = handleAction;