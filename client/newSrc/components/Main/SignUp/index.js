import React from "react";
import "./style.css";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            message: null
        };
    }

    componentDidMount() {
        this.props.socket.on("sign_up_answer", (answer) => {
            if(answer === "success") {
                this.setState({
                    message: "success, now you can log in"
                });
            } else {
                this.setState({
                    message: `error: ${answer}`
                });
            }
        });
        this.props.socket.emit("sign_up_connection");
    }

    componentWillUnmount() {
        this.props.socket.emit("sign_up_disconnect");
        this.props.socket.removeAllListeners("sign_up_answer");
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
        if(elements.password.value !== elements.repeatPassword.value) {
            this.setState({
                message: "error: entered passwords must match"
            });
            return;
        };
        this.props.socket.emit("sign_up_attempt", {
            userName: elements.userName.value,
            password: elements.password.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="userName" placeholder="username"/>
                <input type="text" name="password" placeholder="password"/>
                <input type="text" name="repeatPassword" placeholder="repeat password"/>
                <button type="submit">sign up</button>
                {this.state.message &&
                    <div>{this.message}</div>
                }
            </form>
        );
    }
}

export default SignUp;