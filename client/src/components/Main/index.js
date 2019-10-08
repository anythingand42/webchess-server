import React from "react";
import { connect } from "react-redux";
import Main from "./Main.js";
import {
    mainSetGameFlag,
    reset
} from "../../store/Main/actions.js";
import {
    fetchInitialState,
    logOut
} from "../../store/Main/sagaActions.js";

function ConnectedMain(props) {
        return(
            <Main
                isGameActive={props.isGameActive}
                userName={props.userName}
                isSocketConnected={props.isSocketConnected}
                reset={props.reset}
                fetchInitialState={props.fetchInitialState}
                logIn={props.logIn}
                logOut={props.logOut}
            />
        );
}

const mapStateToProps = (state) => {
    return {
        isGameActive: state.main.isGameActive,
        userName: state.main.userName,
        isSocketConnected: state.main.isSocketConnected
    }
};

const mapDispatchToProps = {
    reset,
    fetchInitialState,
    mainSetGameFlag,
    logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);