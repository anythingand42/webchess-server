import React, {Component} from "react";
import Styles from "./styles";

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.socket = props.socket;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("submit");
        this.socket.emit("send_msg", this.state.value);
        this.setState({value: ""});
    }

    render() {
        return (
            <Styles.Form onSubmit={this.handleSubmit}>
                <Styles.Input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </Styles.Form>
        );
    }
}

export default MessageForm;