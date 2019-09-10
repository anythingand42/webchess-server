import React from "react";
import "./style.css";
import Header from "./Header";
import SearchOpponent from "./SearchOpponent";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ChessGame from "./ChessGame";
import io from "socket.io-client/dist/socket.io";
import setCookie from "set-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
    }

    handleSearchButtonClick(options) {
        console.log(options);
    }

    render() {
        return (
            <div className="main-container">
                <Router>
                    <Header userName={this.props.userName}/>
                    <Route exact path="/" render={(props) => <SearchOpponent socket={this.socket} {...props} />} />
                    <Route path="/login" render={(props) => <LogIn socket={this.socket} {...props} />} />
                    <Route path="/signup" render={(props) => <SignUp socket={this.socket} {...props} />} />
                    <Route path="/gameroom" component={ChessGame} />
                </Router>
            </div>
        );
    }
}

export default Main;