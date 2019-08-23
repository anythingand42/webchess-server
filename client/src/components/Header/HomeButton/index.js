import React from "react";
import Button from "../../Button";
import s from "./style.css";
import {Link} from "react-router-dom";

function HomeButton() {
    return (
        <Link to={"/"}>
            <Button text="home" cssClasses={[s["play-button"]]}/>
        </Link>
    )
}

export default HomeButton;