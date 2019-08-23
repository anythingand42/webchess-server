import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function BasicExample() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route path="/play" component={Main} />
                <Route path="/login" component={Main} />
            </div>
        </Router>
    );
}

ReactDOM.render(<BasicExample />, document.getElementById("root"));