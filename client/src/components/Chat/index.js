import React, {Component} from "react";
import MessageForm from "./MessageForm";
import Textarea from "./Textarea";
import Styles from "./styles.js";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
    }

    render() {
        return (
            <Styles.ChatDiv>
                <Textarea socket={this.socket}/>
                <MessageForm socket={this.socket}/>
            </Styles.ChatDiv>
        );
    }
}

export default Chat;