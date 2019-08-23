import React from "react";
import b from "bootstrap/dist/css/bootstrap.css";
import s from "./style.css";

function Button(props) {
    const cssClasses = props.cssClasses.join(" ");
    let state;
    if(props.pressed) {
        state = "pressed";
    } else {
        state = "released";
    }
    return (
        <button btn-state={state}
                onClick={props.onClick}
                type={"button"}
                className={`
                    ${b.btn} 
                    ${b["btn-dark"]} 
                    ${cssClasses} 
                    ${s.btn}
                `}
        >
            {props.text}
        </button>
    )
}
export default Button;