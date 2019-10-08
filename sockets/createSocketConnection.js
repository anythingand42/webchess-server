const cookieParser = require("cookie-parse");
const AnonChallenge = require("../models/anonChallenge.js");
const UserChallenge = require("../models/userChallenge.js");
const manageMainActions = require("./controllers/manageMainActions");
const manageSearchOpponentActions = require("./controllers/manageSearchOpponentActions");
const manageOnlineChessGameActions = require("./controllers/manageOnlineChessGameActions");
const User = require("../models/user.js");

function createSocketConnection(server) {
    const io = require("socket.io")(server);

    io.on("connection", function(socket) {

        socket.on("disconnect", async () => {
            const cookie = socket.request.headers.cookie;
            let user;
            let anon;
            let parsedCookie;

            if (cookie) {
                parsedCookie = cookieParser.parse(cookie);
                const userToken = parsedCookie.webchessUser;
                const anonToken = parsedCookie.anonymous;
                if(userToken) {
                    user = await User.findOne({userToken});
                }
                if(anonToken) {
                    anon = await User.findOne({anonToken});
                }
            }
            if(user) {
                await UserChallenge.deleteMany({challengerSocketId: socket.id});
                io.to("users").emit("action", {
                    type: "toClient/send_challenges",
                    payload: await UserChallenge.find({})
                });
            } 
            if(anon) {
                await AnonChallenge.deleteMany({challengerSocketId: socket.id});
                io.to("anonymous").emit("action", {
                    type: "toClient/send_challenges",
                    payload: await AnonChallenge.find({})
                });
                await anon.remove();
            }
        });

        socket.on("action", async (action) => {
            const cookie = socket.request.headers.cookie;
            console.log(action.type, cookie);
            let parsedCookie;
            let user;
            if (cookie) {
                parsedCookie = cookieParser.parse(cookie);
                const userToken = parsedCookie.webchessUser;
                const anonToken = parsedCookie.anonymous;
                if(userToken) user = await User.findOne({ token: userToken });
                if(anonToken) user = await User.findOne({ token: anonToken })
            }
            if(!user) console.log("WARNING, USER IS UNDEFINED");

            const splittedActionType = action.type.split("/");
            const component = splittedActionType[1];
            const type = splittedActionType[2];
            const payload = action.payload;

            if(component === "Main")  await manageMainActions({ io, socket, payload, type, user });
            if(component === "SearchOpponent")  await manageSearchOpponentActions({ io, socket, payload, type, user });
            if(component === "OnlineChessGame")  await manageOnlineChessGameActions({ io, socket, payload, type, user });
        });
    });
    return io;
}

module.exports = createSocketConnection;