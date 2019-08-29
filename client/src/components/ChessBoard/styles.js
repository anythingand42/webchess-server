import styled from "styled-components";

const Styles = {
    ChessBoard: styled.div`
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    `,
    Div: styled.div`
        width: 100%;
        height: 100%;
    `,
    Dummy: styled.div`
        margin-top: 100%;
    `
};

export default Styles;