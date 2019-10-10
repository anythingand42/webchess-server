import React from "react";
import Main from "./components/Main";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "./store/rootReducer.js";
import rootSaga from "./store/rootSaga.js"
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";

const socket = io();
socket.on("action", (args) => {
    console.log("action from server", args);
});
const socketIoMiddleware = createSocketIoMiddleware(socket, "toServer/");
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, socketIoMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

export default App;