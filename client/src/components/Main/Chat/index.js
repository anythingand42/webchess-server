import React, {Component} from "react";
import "./style.css";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputMsg: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.ref = React.createRef();
    }

    handleSubmit() {
        event.preventDefault();
        const inputMsg = this.state.inputMsg;
        if(!inputMsg) return;
        this.setState({inputMsg: ""});
        this.props.handleSubmit(inputMsg);
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
                <textarea className="messages" readOnly value={this.props.messages} ref={this.ref} />
                <input
                    onChange={this.handleInputChange}
                    autoComplete="off"
                    type="text"
                    placeholder="type your message here ..."
                    className="input-msg"
                    name="inputMsg"
                    value={this.state.inputMsg}
                />
            </form>
        );
    }
}

export default Chat;