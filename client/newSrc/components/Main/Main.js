import React from "react";
import "./style.css";
import Header from "./Header";
import SearchOpponent from "./SearchOpponent";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ChessGame from "./ChessGame";
import ChessGame_standard from "./ChessGame_standard";
import io from "socket.io-client/dist/socket.io";
import setCookie from "set-cookie";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
        this.activeGame = false;
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleContinueGame = this.handleContinueGame.bind(this);
    }

    componentDidMount() {
        this.socket.on("start_game", this.handleStartGame);
        this.socket.on("continue_game", this.handleContinueGame);
    }

    handleContinueGame(options) {
        this.props.mainSetGame({
            mode: "standard",
            opponentSocketId: options.opponentSocketId,
            color: options.color
        });
    }

    handleStartGame(options) {
        if(options) {
            setCookie('webchessGame', JSON.stringify({
                gameId: options.gameId,
                color: options.color
            }), { maxAge: 3000 });
        }

        this.props.mainSetGame({
            mode: "standard"
        });
    }

    render() {
        return (
            <div className="main-container">
                <Router>
                    <Header userName={this.props.userName}/>
                    <Route exact path="/" render={(props) => (
                        this.props.game ? (
                            <Redirect to="/gameroom"/>
                        ) : (
                            <SearchOpponent socket={this.socket} {...props} />
                        )
                    )}/>
                    <Route path="/login" render={(props) => <LogIn socket={this.socket} {...props} />} />
                    <Route path="/signup" render={(props) => <SignUp socket={this.socket} {...props} />} />
                    <Route path="/trainingroom" component={ChessGame} />
                    <Route
                        path="/gameroom"
                        render={(props) => <ChessGame_standard
                            socket={this.socket}
                            {...props}
                        />}
                    />
                </Router>
            </div>
        );
    }
}

export default Main;