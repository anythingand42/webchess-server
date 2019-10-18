const applyHandler = require("./applyHandler.js");
const getUserByCookie = require("./getUserByCookie.js");

function createSocketConnection(server) {
    const io = require("socket.io")(server);
    io.on("connection", function(socket) {

        socket.on("disconnect", async () => {
            const user = await getUserByCookie(socket.request.headers.cookie);
            if(!user) return;
            const component = user.activeComponent;
            const action = { type: `toServer/${component}/disconnect` }
            applyHandler({action, io, socket, user});
        });

        socket.on("action", (action) => {
            console.log("handleAction: ", action);
            applyHandler({action, io, socket});
        });

    });
    return io;
}

module.exports = createSocketConnection;