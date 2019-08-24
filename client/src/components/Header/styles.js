import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Styles = {
    Header: styled.div`
        display: flex;
        width: 100%;
        margin-top: 10px;
        justify-content: space-between;
        height: 5%;
    `,
    LoginDiv: styled.div`
        width: 20%;
        height: 100%;
        margin-right: 2%;
        
        @media (min-width: 800px) {
            width: 160px;
            margin-right: 20px;
        }
    `,
    HomeDiv: styled.div`
        width: 20%;
        height: 100%;
        margin-left: 2%;
        
        @media (min-width: 800px) {
            width: 160px;
            margin-left: 20px;
        }
    `,
    Button: styled(Button)`
        width: 100%;
        height: 100%;
    `
};

export default Styles;