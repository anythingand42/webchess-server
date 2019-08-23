import React from "react";
import Button from "../../Button";
import s from "./style.css";
import {Link} from "react-router-dom";

function LogIn() {
    return (
        <Link to={"/login"}>
            <Button text={"login"} cssClasses={[s["log-in-button"]]} />
        </Link>
    )
}

export default LogIn;