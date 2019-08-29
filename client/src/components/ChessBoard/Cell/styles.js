import styled from "styled-components";
import K from "../piecesImages/from_wiki/wk.svg";
import Q from "../piecesImages/from_wiki/wq.svg";
import R from "../piecesImages/from_wiki/wr.svg";
import B from "../piecesImages/from_wiki/wb.svg";
import N from "../piecesImages/from_wiki/wn.svg";
import P from "../piecesImages/from_wiki/wp.svg";
import k from "../piecesImages/from_wiki/bk.svg";
import q from "../piecesImages/from_wiki/bq.svg";
import r from "../piecesImages/from_wiki/br.svg";
import b from "../piecesImages/from_wiki/bb.svg";
import n from "../piecesImages/from_wiki/bn.svg";
import p from "../piecesImages/from_wiki/bp.svg";

const EmptyCell = styled.div`
    background-color: rgb(100, 100, 100);
    :nth-child(-2n+7) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(8) ~ :nth-child(-2n+16) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(16) ~ :nth-child(-2n+23) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(24) ~ :nth-child(-2n+32) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(32) ~ :nth-child(-2n+39) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(40) ~ :nth-child(-2n+48) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(48) ~ :nth-child(-2n+55) {
        background-color: rgb(210, 210, 210);
    };
    :nth-child(56) ~ :nth-child(-2n+64) {
        background-color: rgb(210, 210, 210);
    };
`;

const Styles = {
    EmptyCell: EmptyCell,
    "K": styled(EmptyCell)`
        background-image: url(${K});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "Q": styled(EmptyCell)`
        background-image: url(${Q});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "R": styled(EmptyCell)`
        background-image: url(${R});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "B": styled(EmptyCell)`
        background-image: url(${B});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "N": styled(EmptyCell)`
        background-image: url(${N});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "P": styled(EmptyCell)`
        background-image: url(${P});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "k": styled(EmptyCell)`
        background-image: url(${k});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "q": styled(EmptyCell)`
        background-image: url(${q});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "r": styled(EmptyCell)`
        background-image: url(${r});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "b": styled(EmptyCell)`
        background-image: url(${b});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "n": styled(EmptyCell)`
        background-image: url(${n});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "p": styled(EmptyCell)`
        background-image: url(${p});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "highlighter": styled.div`
        background-color: rgba(0, 0, 255, 0.1);
        width: 100%;
        height: 100%;
        pointer-events: none;
    `
};

export default Styles;