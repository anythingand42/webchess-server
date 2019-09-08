import React from "react";
import "./style.css";
import wk from "../piecesImages/alpha/wk.svg";
import wq from "../piecesImages/alpha/wq.svg";
import wr from "../piecesImages/alpha/wr.svg";
import wb from "../piecesImages/alpha/wb.svg";
import wn from "../piecesImages/alpha/wn.svg";
import wp from "../piecesImages/alpha/wp.svg";
import bk from "../piecesImages/alpha/bk.svg";
import bq from "../piecesImages/alpha/bq.svg";
import br from "../piecesImages/alpha/br.svg";
import bb from "../piecesImages/alpha/bb.svg";
import bn from "../piecesImages/alpha/bn.svg";
import bp from "../piecesImages/alpha/bp.svg";
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