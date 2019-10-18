const applyHandler = require("./applyHandler.js");
const getUserByCookie = require("./getUserByCookie.js");

function createSocketConnection(server) {
    const io = require("socket.io")(server);
    io.on("connection", function(socket) {

        socket.on("disconnect", async () => {
            const user = await getUserByCookie(socket.request.headers.cookie);
            if(!user) return;
            user.isConnected = false;
            await user.save();
            const component = user.activeComponent;
            let action = { type: `toServer/${component}/disconnect` }
            applyHandler({action, io, socket, user});
            action = { type: `toServer/${component}/unmount` }
            applyHandler({action, io, socket, user});
        });

        socket.on("action", async (action) => {
            console.log("handleAction: ", action);
            const user = await getUserByCookie(socket.request.headers.cookie);
            if(!user) {
                console.log("can't get user by cookie");
                socket.emit("action", {
                    type: "toClient/Main/refresh_window"
                });
                return;
            }
            user.isConnected = true;
            await user.save();
            applyHandler({action, io, socket, user});
        });

    });
    return io;
}

module.exports = createSocketConnection;