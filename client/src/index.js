import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import rootReducer from "./store/rootReducer.js";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(function* helloSaga() {
//     console.log('Hello Sagas!')
// });

ReactDOM.render(<App />, document.getElementById("root"));