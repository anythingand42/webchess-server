import React from "react";
import SearchPlayButton from "./SearchPlayButton";
import s from  "./style.css";

function SearchPlayButtons(props) {
    return (
        <div className={s["search_buttons_group"]}>
            <SearchPlayButton socket = {props.socket} text="bullet 1+0" options="1+0"/>
            <SearchPlayButton socket = {props.socket} text="bullet 2+1" options="2+1"/>
            <SearchPlayButton socket = {props.socket} text="blitz 3+0" options="3+0"/>
            <SearchPlayButton socket = {props.socket} text="blitz 3+2" options="3+2"/>
            <SearchPlayButton socket = {props.socket} text="blitz 5+0" options="5+0"/>
            <SearchPlayButton socket = {props.socket} text="blitz 5+3" options="5+3"/>
        </div>
    )
}

export default SearchPlayButtons;