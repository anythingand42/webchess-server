import React from "react";
import StyledButton from "./styles.js";

function LobbyButton(props) {
    const {text} = props;
    return (
        <StyledButton>{text}</StyledButton>
    )
}

export default LobbyButton;