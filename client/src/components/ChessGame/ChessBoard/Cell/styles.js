import styled from "styled-components";
import wk from "../piecesImages/from_wiki/wk.svg";
import wq from "../piecesImages/from_wiki/wq.svg";
import wr from "../piecesImages/from_wiki/wr.svg";
import wb from "../piecesImages/from_wiki/wb.svg";
import wn from "../piecesImages/from_wiki/wn.svg";
import wp from "../piecesImages/from_wiki/wp.svg";
import bk from "../piecesImages/from_wiki/bk.svg";
import bq from "../piecesImages/from_wiki/bq.svg";
import br from "../piecesImages/from_wiki/br.svg";
import bb from "../piecesImages/from_wiki/bb.svg";
import bn from "../piecesImages/from_wiki/bn.svg";
import bp from "../piecesImages/from_wiki/bp.svg";

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
    "wk": styled(EmptyCell)`
        background-image: url(${wk});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "wq": styled(EmptyCell)`
        background-image: url(${wq});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "wr": styled(EmptyCell)`
        background-image: url(${wr});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "wb": styled(EmptyCell)`
        background-image: url(${wb});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "wn": styled(EmptyCell)`
        background-image: url(${wn});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "wp": styled(EmptyCell)`
        background-image: url(${wp});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "bk": styled(EmptyCell)`
        background-image: url(${bk});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "bq": styled(EmptyCell)`
        background-image: url(${bq});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "br": styled(EmptyCell)`
        background-image: url(${br});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "bb": styled(EmptyCell)`
        background-image: url(${bb});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "bn": styled(EmptyCell)`
        background-image: url(${bn});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    `,
    "bp": styled(EmptyCell)`
        background-image: url(${bp});
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