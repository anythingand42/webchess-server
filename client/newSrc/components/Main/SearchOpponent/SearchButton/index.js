import React from "react";
import "../../../Button/style.css";
import "./style.css";

function SearchButton(props) {
    return(
        <button
            className="button_gray search-buttons-group__search-button"
            onClick={() => props.onClick(props.options)}
        >
            {props.text}
        </button>
    );
}

export default SearchButton;