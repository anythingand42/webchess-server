import React from "react";
import "./style.css";
import Header from "./Header";
import SearchOpponent from "./SearchOpponent";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ChessGame from "./ChessGame";
import ChessGame_standard from "./ChessGame_standard";
import io from "socket.io-client/dist/socket.io";
import cookies from "browser-cookies";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
        this.activeGame = false;
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        const user = cookies.get("webchessUser");
        this.userName = user ? JSON.parse(user).name : null;
    }

    componentDidMount() {
        this.socket.on("start_game", this.handleStartGame);
    }

    componentWillUnmount() {
        this.socket.removeAllListeners("start_game");
        this.props.reset();
    }

    handleLogOut() {
        cookies.erase("webchessUser");
        window.location.replace("/");
    }

    handleStartGame(options) {
        if(options) {
            cookies.set("webchessGame", JSON.stringify({ gameId: options.gameId, color: options.color }) );
        }
        
        this.props.mainSetGame({
            mode: "standard"
        });
    }

    render() {
        return (
            <div className="main-container">
                <Router>
                    <Header userName={this.userName} onLogOut={this.handleLogOut}/>
                    <Route exact path="/" render={(props) => (
                        this.props.game ? (
                            <Redirect to="/gameroom"/>
                        ) : (
                            <SearchOpponent socket={this.socket} userName={this.userName} {...props} />
                        )
                    )}/>
                    <Route path="/login" render={(props) => <LogIn socket={this.socket} setUserName={this.props.setUserName} {...props} />} />
                    <Route path="/signup" render={(props) => <SignUp socket={this.socket} {...props} />} />
                    <Route path="/trainingroom" component={ChessGame} />
                    <Route
                        path="/gameroom"
                        render={(props) => (
                            <ChessGame_standard
                            socket={this.socket}
                            mainSetGame={this.props.mainSetGame}
                            {...props}
                        />)}
                    />
                </Router>
            </div>
        );
    }
}

export default Main;