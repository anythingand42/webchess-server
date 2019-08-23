import React from "react";
import Button from "../../../Button";
import s from "./style.css";

function LobbyButton(props) {
    const {text} = props;
    return (
        <Button text={text} cssClasses={[s["lobby-btn"]]} />
    )
}

export default LobbyButton;