import React, {Component} from "react";
import Styles from "./styles.js";

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleGetMsg = this.handleGetMsg.bind(this);
        this.socket = props.socket;
        this.socket.on("get_msg", this.handleGetMsg);
        this.ref = React.createRef();
    }

    handleGetMsg(msg) {
        this.ref.current.scrollTop = this.ref.current.scrollHeight + 999;
        this.setState(state => ({
            value: `${state.value}${msg}\n`
        }));
    }

    render() {
        return (
            <Styles.Textarea readOnly ref={this.ref} value={this.state.value} />
        );
    }
}

export default Textarea;