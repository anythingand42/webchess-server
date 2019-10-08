import React from "react";
import "./style.css";
import Header from "./Header";
import SearchOpponent from "./SearchOpponent";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ChessGame from "./ChessGame";
import OnlineChessGame from "./OnlineChessGame";
import cookies from "browser-cookies";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchInitialState();
    }

    // componentWillUnmount() {
    //     this.props.socket.removeAllListeners("start_game");
    //     this.props.reset();
    // }

    // handleStartGame(options) {
    //     if(options) {
    //         cookies.set(
    //             "webchessGame",
    //             JSON.stringify({ gameId: options.gameId, color: options.color }),
    //             { expires: 1, httponly: true, samesite: "Strict" }
    //         );
    //     }

    //     this.props.mainSetGame({
    //         mode: "standard"
    //     });
    // }

    render() {
        if(this.props.isSocketConnected) {
            return (
                <div className="main-container">
                    <Router>
                        <Header userName={this.props.userName} onLogOut={this.props.logOut}/>
                        <Route exact path="/" render={(props) => (
                            this.props.isGameActive ? (
                                <Redirect to="/gameroom"/>
                            ) : (
                                <SearchOpponent {...props}/>
                            )
                        )}/>
                        <Route path="/login" component={LogIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/trainingroom" component={ChessGame} />
                        <Route path="/gameroom" component={OnlineChessGame} />
                    </Router>
                </div>
            );
        } else {
            return (
                <div>loading...</div>
            );
        }
    }
}

export default Main;