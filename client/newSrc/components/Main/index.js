import React from "react";
import { connect } from "react-redux";
import Main from "./Main.js";
import {
    mainSetGame,
    reset
} from "../../store/Main/actions";

class ConnectedMain extends React.Component {
    render() {
        return(
            <Main
                game={this.props.game}
                mainSetGame={this.props.mainSetGame}
                reset={this.props.reset}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.main.game
    }
};

const mapDispatchToProps = {
    mainSetGame,
    reset
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);