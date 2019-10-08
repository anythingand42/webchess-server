import React from "react";
import "./style.css";

class SignUp extends React.Component {
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
        this.props.signUp({
            userName: elements.userName.value,
            password: elements.password.value,
            repeatPassword: elements.repeatPassword.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="userName" placeholder="username"/>
                <input type="password" name="password" placeholder="password"/>
                <input type="password" name="repeatPassword" placeholder="repeat password"/>
                <button type="submit">sign up</button>
                {this.props.message &&
                    <div>{this.props.message}</div>
                }
            </form>
        );
    }
}

export default SignUp;