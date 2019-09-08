import React from "react";
import SearchButton from "./SearchButton";
import Lobby from "./Lobby";
import "./style.css";
import "../../Button/style.css";
// import io from "socket.io-client/dist/socket.io";
import {Link} from "react-router-dom";

class SearchOpponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.refreshLobby = this.refreshLobby.bind(this);
    }

    // componentDidMount() {
    //     this.socket = io();
    //     this.socket.on("refresh_lobby", this.refreshLobby);
    //     this.socket.on("challenge_added", );
    // }
    //
    // componentWillUnmount() {
    //     this.socket.removeAllListeners("refresh_lobby");
    // }

    refreshLobby(challenges) {
        this.props.setChallengesSearchOpponent(challenges);
    }

    handleSearchButtonClick(options) {
        if(this.props.canClick) {
            this.socket.emit("add_challenge", options);
            this.props.setCanClickSearchOpponent(false);
        }
    }

    render() {
        return (
            <div className="search-opponent-container">
                <div className="search-opponent-container__search-buttons-group">
                    <SearchButton text="bullet 1+0" options="1+0" onClick={this.handleSearchButtonClick}/>
                    <SearchButton text="bullet 1+1" options="1+1" onClick={this.handleSearchButtonClick}/>
                    <SearchButton text="bullet 2+1" options="2+1" onClick={this.handleSearchButtonClick}/>
                    <SearchButton text="blitz 3+0" options="3+0" onClick={this.handleSearchButtonClick}/>
                    <SearchButton text="blitz 3+2" options="3+2" onClick={this.handleSearchButtonClick}/>
                    <SearchButton text="blitz 5+3" options="5+3" onClick={this.handleSearchButtonClick}/>
                </div>
                {/*<h3 className="search-opponent-container__center-header">challenges:</h3>*/}
                <Lobby
                    challenges={this.props.challenges}
                />
                {/*<h3 className="search-opponent-container__left-header">add challenge:</h3>*/}
                <div className="search-opponent-container__right-buttons-group">
                    <button className="button_gray right-buttons-group__button">create custom game</button>
                    <Link to="/gameroom" className="right-buttons-group__button">
                        <button className="button_gray">play with yourself</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SearchOpponent;
