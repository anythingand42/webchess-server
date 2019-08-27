import styled from "styled-components";

const Styles = {
    ChessBoard: styled.div`
        display: grid;
        width: 560px;
        height: 560px;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    `
};

export default Styles;