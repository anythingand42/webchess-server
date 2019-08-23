import React, {Component} from "react";

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleGetMsg = this.handleGetMsg.bind(this);
        this.socket = props.socket;
        this.socket.on("get_msg", this.handleGetMsg);
    }

    handleGetMsg(msg) {
        this.setState(state => ({
            value: `${state.value}${msg}\n`
        }));
    }

    render() {
        return (
            <textarea readOnly={true} value={this.state.value} />
        );
    }
}

export default Textarea;