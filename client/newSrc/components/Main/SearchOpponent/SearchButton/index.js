import React from "react";
import "../../../Button/style.css";
import "./style.css";

function SearchButton(props) {
    const pressed = props.isPressed ? " search-button_pressed" : "";
    return(
        <button
            className={`button_gray search-buttons-group__search-button${pressed}`}
            onClick={() => props.onClick(props.time, props.mode)}
        >
            {props.text}
        </button>
    );
}

export default SearchButton;