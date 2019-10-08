import React from "react";
import "./style.css";

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.handleUnmount();
    }

    handleSubmit(event) {
        event.preventDefault();
        const elements = event.target.elements;
        this.props.logIn({
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
                {this.props.message &&
                    <div>{this.props.message}</div>
                }
            </form>
        );
    }
}

export default LogIn;