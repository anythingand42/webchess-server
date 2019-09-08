import React from "react";
import "./style.css";

class Register extends React.Component {
    render() {
        return (
            <div>
                <input type="text" name="userName" placeholder="username"/>
                <input type="text" name="password" placeholder="password"/>
                <input type="text" name="password" placeholder="repeat password"/>
                <button>register</button>
            </div>
        );
    }
}

export default Register;