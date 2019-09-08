import React from "react";
import { connect } from "react-redux";
import Main from "./Main.js";
import {
    mainSetUserName
} from "../../store/Main/actions";

class ConnectedMain extends React.Component {
    render() {
        return(
            <Main
                userName={this.props.userName}
                setUserName={this.props.mainSetUserName}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.main.userName
    }
};

const mapDispatchToProps = {
    mainSetUserName: mainSetUserName
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);