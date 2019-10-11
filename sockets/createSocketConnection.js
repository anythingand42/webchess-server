const handleAction = require("./handleAction.js");
const getUserByCookie = require("./getUserByCookie.js");
const handleUserDisconnect = require("./handleUserDisconnect.js");
const handleAnonDisconnect = require("./handleAnonDisconnect.js");

function createSocketConnection(server) {
    const io = require("socket.io")(server);
    io.on("connection", function(socket) {

        socket.on("disconnect", async () => {
            const user = await getUserByCookie(socket.request.headers.cookie);
            if(!user) throw new Error("can't get user by cookie");
            console.log("disconnect", user);
            if(user.name) {
                await handleUserDisconnect(user, io, socket.id);
            } else {
                await handleAnonDisconnect(user, io, socket.id);
            }
        });

        socket.on("action", async (action) => {
            console.log(action);
            const user = await getUserByCookie(socket.request.headers.cookie);
            if(!user) throw new Error("can't get user by cookie");
            handleAction({action, io, socket, user});
        });

    });
    return io;
}

module.exports = createSocketConnection;