import React from "react";
import Styles from "./styles.js";
import Button from "../Button";
import {Link} from "react-router-dom";

function Header() {
    return (
        <Styles.Header>
            <Styles.HomeDiv>
                <Link to="/">
                    <Styles.Button>home</Styles.Button>
                </Link>
            </Styles.HomeDiv>
            <Styles.LoginDiv>
                <Link to="/login">
                    <Styles.Button>log in</Styles.Button>
                </Link>
            </Styles.LoginDiv>
        </Styles.Header>
    )
}

export default Header;
