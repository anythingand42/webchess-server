import styled from "styled-components";
import Button from "../../../Button";

const Styles = {
    PressedButton: styled(Button)`
        width: 100%;
        margin-bottom: 7%;
        background-color: rgb(50, 50, 50);
        :last-child {
            margin-bottom: 0;
        }
        &:hover {
            background-color: rgb(40, 40, 40);
        }
    `,
    ReleasedButton: styled(Button)`
        width: 100%;
        margin-bottom: 7%;
        :last-child {
            margin-bottom: 0;
        }
    `
};

export default Styles;