import React from "react";
import { connect } from "react-redux";
import Main from "./Main.js";
import {
    mainSetUserName,
    mainSetGame
} from "../../store/Main/actions";

class ConnectedMain extends React.Component {
    render() {
        return(
            <Main
                userName={this.props.userName}
                game={this.props.game}
                setUserName={this.props.mainSetUserName}
                mainSetGame={this.props.mainSetGame}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.main.userName,
        game: state.main.game
    }
};

const mapDispatchToProps = {
    mainSetUserName: mainSetUserName,
    mainSetGame: mainSetGame
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);