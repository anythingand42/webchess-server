import React from "react";
import { connect } from "react-redux";
import SearchOpponent from "./SearchOpponent.js";
import {
    searchButtonSetAvailability,
    lobbySetChallenges,
    searchButtonSetPressed,
    reset
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
                reset={this.props.reset}
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
    searchButtonSetAvailability,
    searchButtonSetPressed,
    lobbySetChallenges,
    reset
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchOpponent);