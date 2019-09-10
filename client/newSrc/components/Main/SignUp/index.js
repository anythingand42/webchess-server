import React from "react";
import "./style.css";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const elements = event.target.elements;
        if(!elements.userName.value) return;
        if(!elements.password.value) return;
        if(elements.password.value !== elements.repeatPassword.value) return;
        this.props.socket.emit("sign_up_attempt", {
            userName: elements.userName.value,
            password
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="userName" placeholder="username"/>
                <input type="text" name="password" placeholder="password"/>
                <input type="text" name="repeatPassword" placeholder="repeat password"/>
                <button type="submit">sign up</button>
            </form>
        );
    }
}

export default SignUp;