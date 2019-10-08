import React from "react";
import { connect } from "react-redux";
import LogIn from "./LogIn.js";
import {
    logIn,
    handleUnmount
} from "../../../store/LogIn/sagaActions.js";

function ConnectedLogIn(props) {
        return(
            <LogIn
                message={props.message}
                logIn={props.logIn}
                handleUnmount={props.handleUnmount}
            />
        );
}

const mapStateToProps = (state) => {
    return {
        message: state.logIn.message
    }
};

const mapDispatchToProps = {
    logIn,
    handleUnmount
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedLogIn);