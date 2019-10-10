import React from "react";
import { connect } from "react-redux";
import SearchOpponent from "./SearchOpponent.js";
import {
    fetchInitialState,
    handleSearchButtonClick,
    handleUnmount
} from "../../../store/SearchOpponent/sagaActions";

class ConnectedSearchOpponent extends React.Component {
    render() {
        return(
            <SearchOpponent
                buttons={this.props.buttons}
                challenges={this.props.challenges}
                fetchInitialState={this.props.fetchInitialState}
                handleSearchButtonClick={this.props.handleSearchButtonClick}
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
    fetchInitialState,
    handleUnmount
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchOpponent);