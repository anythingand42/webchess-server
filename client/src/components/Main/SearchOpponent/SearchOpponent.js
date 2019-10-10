import React from "react";
import SearchButton from "./SearchButton";
import Lobby from "./Lobby";
import "./style.css";
import "../../Button/style.css";
import {Link} from "react-router-dom";

class SearchOpponent extends React.Component {

    componentDidMount() {
        this.props.fetchInitialState();
    }

    componentWillUnmount() {
        this.props.handleUnmount();
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
                        onClick={this.props.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="bullet 1+1"
                        time="1+1"
                        mode="standard"
                        isPressed={this.props.buttons["1+1"].isPressed}
                        onClick={this.props.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="bullet 2+1"
                        time="2+1"
                        mode="standard"
                        isPressed={this.props.buttons["2+1"].isPressed}
                        onClick={this.props.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="blitz 3+0"
                        time="3+0"
                        mode="standard"
                        isPressed={this.props.buttons["3+0"].isPressed}
                        onClick={this.props.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="blitz 3+2"
                        time="3+2"
                        mode="standard"
                        isPressed={this.props.buttons["3+2"].isPressed}
                        onClick={this.props.handleSearchButtonClick}
                    />
                    <SearchButton
                        text="blitz 5+3"
                        time="5+3"
                        mode="standard"
                        isPressed={this.props.buttons["5+3"].isPressed}
                        onClick={this.props.handleSearchButtonClick}
                    />
                </div>
                <Lobby
                    challenges={this.props.challenges}
                />
                <div className="search-opponent-container__right-buttons-group">
                    <button className="button_gray right-buttons-group__button">create custom game</button>
                    <Link to="/trainingroom" className="right-buttons-group__button">
                        <button className="button_gray">play with yourself</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SearchOpponent;
