import React, {Component} from "react";
import "./style.css";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: "",
            inputMsg: "",
            scrollTop: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleGetMsg = this.handleGetMsg.bind(this);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.props.socket.on("send_chat_msg_to_client", this.handleGetMsg);
    }

    handleSubmit() {
        event.preventDefault();
        const msg = `${this.props.userName}: ${this.state.inputMsg}`;
        this.props.socket.emit("send_chat_msg_to_server", msg, this.props.opponentSocketId);
        this.setState(state => ({
            messages: `${state.messages}${msg}\n`,
            inputMsg: ""
        }));
    }

    handleGetMsg(msg) {
        this.setState(state => ({
            messages: `${state.messages}${msg}\n`
        }));
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({inputMsg: event.target.value});
    }

    componentDidUpdate() {
        this.ref.current.scrollTop = this.ref.current.scrollHeight;
    }

    render() {
        return (
            <form className={`chat ${this.props.className}`} onSubmit={this.handleSubmit}>
                <textarea className="messages" readOnly value={this.state.messages} ref={this.ref} />
                <input
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="type your message here ..."
                    className="input-msg"
                    value={this.state.inputMsg}
                />
            </form>
        );
    }
}

export default Chat;