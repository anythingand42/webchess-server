import React from "react";
import "./style.css";

class LogIn extends React.Component {
    render() {
        return (
            <div>
                <input type="text" name="userName" placeholder="username"/>
                <input type="text" name="password" placeholder="password"/>
                <button>log in</button>
            </div>
        );
    }
}

export default LogIn;