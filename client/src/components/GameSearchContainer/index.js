import React from "react";
import SearchPlayButtons from "./SearchPlayButtons";
import Lobby from "./Lobby";
import s from "./style.css";

function GameSearchContainer(props) {
    return (
        <div className={s["game-search-container"]}>
            <SearchPlayButtons socket = {props.socket}/>
            <Lobby socket = {props.socket}/>
        </div>
    )
}

export default GameSearchContainer;


