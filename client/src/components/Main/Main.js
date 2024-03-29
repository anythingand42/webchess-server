import React from "react";
import "./style.css";
import Header from "./Header";
import SearchOpponent from "./SearchOpponent";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import OnlineChessGame from "./OnlineChessGame";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Main extends React.Component {

    componentDidMount() {
        this.props.fetchInitialState();
    }

    render() {
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
                    <Route path="/trainingroom" render={() => (<div>sorry, this mode is not implemented yet</div>)}/>
                    <Route path="/gameroom" component={OnlineChessGame} />
                </Router>
            </div>
        );
    }
}

export default Main;