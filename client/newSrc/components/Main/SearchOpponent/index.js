import React from "react";
import { connect } from "react-redux";
import SearchOpponent from "./SearchOpponent.js";
import {
    searchButtonSetAvailability,
    lobbySetChallenges,
    searchButtonSetPressed
} from "../../../store/SearchOpponent/actions";

class ConnectedSearchOpponent extends React.Component {
    render() {
        return(
            <SearchOpponent
                socket={this.props.socket}
                buttons={this.props.buttons}
                challenges={this.props.challenges}
                searchButtonSetAvailability={this.props.searchButtonSetAvailability}
                searchButtonSetPressed={this.props.searchButtonSetPressed}
                lobbySetChallenges={this.props.lobbySetChallenges}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        buttons: state.searchOpponent.buttons,
        challenges: state.searchOpponent.challenges
    }
};

const mapDispatchToProps = {
    searchButtonSetAvailability: searchButtonSetAvailability,
    searchButtonSetPressed: searchButtonSetPressed,
    lobbySetChallenges: lobbySetChallenges
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchOpponent);