import React from "react";
import PlayButton from "./HomeButton";
import LogInButton from "./LogInButton";
import s from "./style.css";

function Header() {
    return (
        <div className={s.header}>
            <PlayButton />
            <LogInButton />
        </div>
    )
}

export default Header;
