import React from "react";
import "./style.css";

function SearchButton(props) {
    const pressed = props.isPressed ? " search-button_pressed" : "";
    return(
        <button
            className={`button_gray search-buttons-group__search-button${pressed}`}
            onClick={() => props.onClick(props.time)}
        >
            {props.text}
        </button>
    );
}

export default SearchButton;