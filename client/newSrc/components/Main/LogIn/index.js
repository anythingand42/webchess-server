import React from "react";
import "./style.css";
import cookies from "browser-cookies";

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            message: null
        };
    }

    componentDidMount() {
        this.props.socket.on("log_in_answer", (answer, user) => {
            if(answer === "success") {
                cookies.set("webchessUser", JSON.stringify(user) );
                window.location.replace("/");
            } else {
                this.setState({
                    message: `error: ${answer}`
                });
            }
        });
        this.props.socket.emit("log_in_connection");
    }

    componentWillUnmount() {
        this.props.socket.removeAllListeners("log_in_answer");
        this.props.socket.emit("log_in_disconnect");
    }

    handleSubmit(event) {
        event.preventDefault();
        const elements = event.target.elements;
        if(!elements.userName.value) {
            this.setState({
                message: "error: username is required"
            });
            return;
        }
        if(!elements.password.value) {
            this.setState({
                message: "error: password is required"
            });
            return;
        };
        this.props.socket.emit("log_in_attempt", {
            userName: elements.userName.value,
            password: elements.password.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="userName" placeholder="username"/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit">log in</button>
                {this.state.message &&
                    <div>{this.state.message}</div>
                }
            </form>
        );
    }
}

export default LogIn;