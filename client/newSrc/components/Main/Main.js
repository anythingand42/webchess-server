import React from "react";
import "./style.css";
import Header from "./Header";
import SearchOpponent from "./SearchOpponent";
import LogIn from "./LogIn";
import Register from "./Register";
import ChessGame from "./ChessGame";
import io from "socket.io-client/dist/socket.io";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        // this.socket = io();
    }

    handleSearchButtonClick(options) {
        console.log(options);
    }

    render() {
        // return (
        //     <div className="main-container">
        //         <Header/>
        //         <SearchOpponent/>
        //     </div>
        // );
        return (
            <div className="main-container">
                <Router>
                    <Header/>
                    <Route exact path="/" component={SearchOpponent} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/register" component={Register} />
                    <Route path="/gameroom" component={ChessGame} />
                </Router>
            </div>
        );
    }
}

export default Main;