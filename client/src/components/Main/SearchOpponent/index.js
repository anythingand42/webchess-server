import React from "react";
import { connect } from "react-redux";
import SearchOpponent from "./SearchOpponent.js";
import {
    handleMount,
    handleSearchButtonClick,
    handleChallengeClick,
    handleUnmount
} from "../../../store/SearchOpponent/sagaActions";

class ConnectedSearchOpponent extends React.Component {
    render() {
        return(
            <SearchOpponent
                buttons={this.props.buttons}
                challenges={this.props.challenges}
                handleMount={this.props.handleMount}
                handleSearchButtonClick={this.props.handleSearchButtonClick}
                handleChallengeClick={this.props.handleChallengeClick}
                handleUnmount={this.props.handleUnmount}
                userName={this.props.userName}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        buttons: state.searchOpponent.buttons,
        challenges: state.searchOpponent.challenges,
        userName: state.main.userName
    }
};

const mapDispatchToProps = {
    handleSearchButtonClick,
    handleChallengeClick,
    handleMount,
    handleUnmount
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchOpponent);