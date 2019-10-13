const handleAction = require("./handleAction.js");
const getUserByCookie = require("./getUserByCookie.js");

function createSocketConnection(server) {
    const io = require("socket.io")(server);
    io.on("connection", function(socket) {

        socket.on("disconnect", async () => {
            const user = await getUserByCookie(socket.request.headers.cookie);
            const component = user.activeComponent;
            const action = { type: `toServer/${component}/disconnect` }
            handleAction({action, io, socket});
        });

        socket.on("action", (action) => {
            console.log("handleAction: ", action);
            handleAction({action, io, socket});
        });

    });
    return io;
}

module.exports = createSocketConnection;