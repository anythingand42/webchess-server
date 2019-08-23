import React, {Component} from "react";
import Button from "../../../Button";
import s from "./style.css";

class SearchPlayButton extends Component {
    constructor(props) {
        super(props);
        this.setPressed = this.setPressed.bind(this);
        this.setReleased = this.setReleased.bind(this);
        this.setAvailable = this.setAvailable.bind(this);
        this.socket = props.socket;
        this.socket.on("challenge_added", this.setPressed);
        this.socket.on("challenge_deleted", this.setReleased);
        this.socket.on("refresh_lobby", this.setAvailable);
        this.text = props.text;
        this.options = props.options;
        this.state = { pressed: false, available: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(!this.state.available) return;
        if(!this.state.pressed) {
            this.socket.emit("add_challenge", this.options);
            this.setState({available: false});
        } else {
            this.socket.emit("delete_challenge", this.options);
            this.setState({available: false});
        }
    };

    setAvailable() {
        this.setState({available: true});
    }

    setPressed(options) {
        if(options === this.options) {
           this.setState({pressed: true, available: true});
        }
    }

    setReleased(options) {
        if(options === this.options) {
            this.setState({pressed: false, available: true});
        }
    }

    componentWillUnmount() {
        this.socket.removeAllListeners("challenge_added");
        this.socket.removeAllListeners("challenge_deleted");
    }

    render() {
        return (
            <Button onClick={this.handleClick}
                    text={this.text}
                    pressed={this.state.pressed}
                    cssClasses={[s["search_button"]]}
            />
        )
    }
}

export default SearchPlayButton;