import React from "react";
import SearchPlayButtons from "./SearchPlayButtons";
import Lobby from "./Lobby";
import Container from "./styles.js";

function GameSearchContainer(props) {
    return (
        <Container>
            <SearchPlayButtons socket = {props.socket}/>
            <Lobby socket = {props.socket}/>
        </Container>
    )
}

export default GameSearchContainer;


