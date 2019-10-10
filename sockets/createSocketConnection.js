const cookieParser = require("cookie-parse");
const AnonChallenge = require("../models/anonChallenge.js");
const UserChallenge = require("../models/userChallenge.js");
const manageMainActions = require("./controllers/manageMainActions");
const manageSearchOpponentActions = require("./controllers/manageSearchOpponentActions");
const manageOnlineChessGameActions = require("./controllers/manageOnlineChessGameActions");
const User = require("../models/user.js");
const ChessGame = require("../models/chessGame.js");

function createSocketConnection(server) {
    const io = require("socket.io")(server);

    io.on("connection", function(socket) {

        socket.on("disconnect", async () => {
            const cookie = socket.request.headers.cookie;
            let user;
            let anon;
            let parsedCookie;

            if(cookie) {
                parsedCookie = cookieParser.parse(cookie);
                const userToken = parsedCookie.webchessUser;
                const anonToken = parsedCookie.anonymous;
                if(userToken) {
                    user = await User.findOne({token: userToken});
                }
                if(anonToken) {
                    anon = await User.findOne({token: anonToken});
                }
            }

            if(user) {
                user.isConnected = false;
                user.isSessionActive = false;
                await user.save();

                await UserChallenge.deleteMany({challengerSocketId: socket.id});
                io.to("users").emit("action", {
                    type: "toClient/send_challenges",
                    payload: await UserChallenge.find({})
                });

                if(user.activeGameId) {
                    const id = user._id;
                    setTimeout(async () => {
                        const user = await User.findById(id);
                        if(user.isConnected) return;

                        const color = user.activeGameColor;
                        let result, resultReason;
                        let opponentColor;
                        if(color === "w") {
                            opponentColor = "b";
                            result = "black won";
                            resultReason = "white disconnected";
                        } else {
                            opponentColor = "w";
                            result = "white won";
                            resultReason = "black disconnected";
                        }

                        const chessGame = await ChessGame.findById(user.activeGameId);
                        if(!chessGame) {
                            user.activeGameId = null;
                            user.activeGameColor = null;
                            await user.save();
                        }

                        io.to(chessGame[opponentColor].socketId).emit("action", {
                            type: "toClient/OnlineChessGame/game_over",
                            payload: {
                                result,
                                reason: resultReason
                            }
                        });

                        user.activeGameId = null;
                        user.activeGameColor = null;

                        const opponent = await User.findById(chessGame[opponentColor].userId);
                        opponent.activeGameId = null;
                        opponent.activeGameColor = null;

                        await Promise.all([
                            user.save(),
                            opponent.save(),
                            chessGame.remove()
                        ]);
                    }, 20000);
                }
            }

            if(anon) {
                await AnonChallenge.deleteMany({challengerSocketId: socket.id});

                if(anon.activeGameId) {
                    const color = anon.activeGameColor;
                    let result, resultReason;
                    let opponentColor;
                    if(color === "w") {
                        opponentColor = "b";
                        result = "black won";
                        resultReason = "white disconnected";
                    } else {
                        opponentColor = "w";
                        result = "white won";
                        resultReason = "black disconnected";
                    }

                    const chessGame = await ChessGame.findById(anon.activeGameId);
                    if(!chessGame.isGameOver) {
                        io.to(chessGame[opponentColor].socketId).emit("action", {
                            type: "toClient/OnlineChessGame/game_over",
                            payload: {
                                result,
                                reason: resultReason
                            }
                        });
                    }

                    anon.activeGameId = null;
                    anon.activeGameColor = null;

                    const opponent = await User.findById(chessGame[opponentColor].userId);
                    opponent.activeGameId = null;
                    opponent.activeGameColor = null;

                    await Promise.all([
                        anon.save(),
                        opponent.save(),
                        chessGame.remove()
                    ]);
                }

                io.to("anonymous").emit("action", {
                    type: "toClient/SearchOpponent/send_challenges",
                    payload: await AnonChallenge.find({})
                });

                await anon.remove();
            }
        });

        socket.on("action", async (action) => {
            const cookie = socket.request.headers.cookie;
            console.log(action);
            let parsedCookie;
            let user;
            if (cookie) {
                parsedCookie = cookieParser.parse(cookie);
                const userToken = parsedCookie.webchessUser;
                const anonToken = parsedCookie.anonymous;
                if(userToken) {
                    user = await User.findOne({ token: userToken });
                    if(!user.isConnected) {
                        user.isConnected = true;
                        await user.save();
                    }
                }
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