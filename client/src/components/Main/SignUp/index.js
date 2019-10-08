import React from "react";
import { connect } from "react-redux";
import SignUp from "./SignUp.js";
import {
    signUp,
    handleUnmount
} from "../../../store/SignUp/sagaActions.js";

function ConnectedSignUp(props) {
        return(
            <SignUp
                message={props.message}
                signUp={props.signUp}
                handleUnmount={props.handleUnmount}
            />
        );
}

const mapStateToProps = (state) => {
    return {
        message: state.signUp.message
    }
};

const mapDispatchToProps = {
    signUp,
    handleUnmount
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSignUp);