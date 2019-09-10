import React from "react";
import SearchButton from "./SearchButton";
import Lobby from "./Lobby";
import "./style.css";
import "../../Button/style.css";
import {Link} from "react-router-dom";

class SearchOpponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.refreshLobby = this.refreshLobby.bind(this);
    }

    componentDidMount() {
        this.props.socket.on("change_in_challenges", this.refreshLobby);
        this.props.socket.on("send_challenges_to_client", this.refreshLobby);
        this.props.socket.emit("get_challenges_from_server");

        this.props.socket.on("challenge_is_added", (time) => {
            const buttonName = time;
            this.props.searchButtonSetAvailability(buttonName, true);
        });

        this.props.socket.on("challenge_is_removed", (time) => {
            const buttonName = time;
            this.props.searchButtonSetAvailability(buttonName, true);
        });
    }

    refreshLobby(challenges) {
        this.props.lobbySetChallenges(challenges);
    }

    handleSearchButtonClick(time, mode) {
        const buttonName = time;
        if(this.props.buttons[buttonName].isAvailable) {
            if(!this.props.buttons[buttonName].isPressed) {
                this.props.searchButtonSetPressed(buttonName, true);
                this.props.searchButtonSetAvailability(buttonName, false);
                this.props.socket.emit("add_challenge", time, mode);
            } else {
                this.props.searchButtonSetPressed(buttonName, false);
                this.props.searchButtonSetAvailability(buttonName, false);
                this.props.socket.emit("remove_challenge", time, mode);
            }
        }
    }

    render() {
        return (
            <div className="search-opponent-container">
                <div className="search-opponent-container__search-buttons-group">
                    <SearchButton
                        text="bullet 1+0"
                        time="1+0"
                        mode="standard"
                        isPressed={this.props.buttons["1+0"].isPressed}
                        onClick={this.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="bullet 1+1"
                        time="1+1"
                        mode="standard"
                        isPressed={this.props.buttons["1+1"].isPressed}
                        onClick={this.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="bullet 2+1"
                        time="2+1"
                        mode="standard"
                        isPressed={this.props.buttons["2+1"].isPressed}
                        onClick={this.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="blitz 3+0"
                        time="3+0"
                        mode="standard"
                        isPressed={this.props.buttons["3+0"].isPressed}
                        onClick={this.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="blitz 3+2"
                        time="3+2"
                        mode="standard"
                        isPressed={this.props.buttons["3+2"].isPressed}
                        onClick={this.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="blitz 5+3"
                        time="5+3"
                        mode="standard"
                        isPressed={this.props.buttons["5+3"].isPressed}
                        onClick={this.handleSearchButtonClick}
                    />
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
