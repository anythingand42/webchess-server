import React from "react";
import { connect } from "react-redux";
import SearchOpponent from "./SearchOpponent.js";
import {
    setChallengesSearchOpponent,
    setCanClickSearchOpponent
} from "../../../store/SearchOpponent/actions";

class ConnectedSearchOpponent extends React.Component {
    render() {
        return(
            <SearchOpponent
                challenges={this.props.challenges}
                canClick={this.props.canClick}
                setChallengesSearchOpponent={this.props.setChallengesSearchOpponent}
                setCanClickSearchOpponent={this.props.setCanClickSearchOpponent}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        challenges: state.searchOpponent.challenges,
        canClick: state.searchOpponent.canClick
    }
};

const mapDispatchToProps = {
    setChallengesSearchOpponent: setChallengesSearchOpponent,
    setCanClickSearchOpponent: setCanClickSearchOpponent
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchOpponent);