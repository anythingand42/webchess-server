import React from "react";
import SearchPlayButton from "./SearchPlayButton";
import ButtonsGroup from "./styles.js";

function SearchPlayButtons(props) {
    return (
        <ButtonsGroup>
            <SearchPlayButton socket = {props.socket} text="bullet 1+0" options="1+0"/>
            <SearchPlayButton socket = {props.socket} text="bullet 2+1" options="2+1"/>
            <SearchPlayButton socket = {props.socket} text="blitz 3+0" options="3+0"/>
            <SearchPlayButton socket = {props.socket} text="blitz 3+2" options="3+2"/>
            <SearchPlayButton socket = {props.socket} text="blitz 5+0" options="5+0"/>
            <SearchPlayButton socket = {props.socket} text="blitz 5+3" options="5+3"/>
        </ButtonsGroup>
    )
}

export default SearchPlayButtons;