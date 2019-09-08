import React from "react";
import Main from "./components/Main";
import ChessGame from "./components/Main/ChessGame";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers.js";

const store = createStore(rootReducer);

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