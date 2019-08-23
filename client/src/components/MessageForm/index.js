import React, {Component} from "react";

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
        this.socket.emit("send_msg", this.state.value);
        this.setState({value: ""});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}

export default MessageForm;