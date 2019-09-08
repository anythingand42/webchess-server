import React from "react";
import "./style.css";
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
const pieces = { wk, wq, wr, wb, wn, wp, bk, bq, br, bb, bn, bp};

class PieceInCell extends React.PureComponent {
    render() {
        const imgClass = this.props.transparent ? " piece_transparent" : "";
        return(
            <img
                src={pieces[this.props.piece]}
                alt=""
                className={`piece${imgClass}`}
            />
        );
    }
}

class Cell extends React.PureComponent {
    render() {
        const highlight = this.props.highlight ? "highlighter" : "highlighter_none";
        if(this.props.piece) {
            return(
                <div
                    className="chess-board__cell"
                    id={this.props.id}
                >
                    <div className={highlight}>
                        <PieceInCell
                            piece={this.props.piece}
                            transparent={this.props.transparentPiece}
                        />
                    </div>
                </div>
            );
        } else {
            return(
                <div
                    className="chess-board__cell"
                    id={this.props.id}
                >
                    <div className={highlight}/>
                </div>
            );
        }
    }
}

export default Cell;