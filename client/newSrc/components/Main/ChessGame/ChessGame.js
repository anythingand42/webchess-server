import React from "react";
import ChessBoard from "../ChessBoard";
import "./style.css";

class ChessGame extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleMouseDownOnBoard = this.handleMouseDownOnBoard.bind(this);
        this.handleMouseUpOnBoard = this.handleMouseUpOnBoard.bind(this);
        this.handleMouseLeaveFromBoard = this.handleMouseLeaveFromBoard.bind(this);
    }

    handleMouseDownOnBoard(event) {
        const piece = this.props.game.get(event.target.id);
        if(piece) {
            this.props.setTravelingPiece({
                left: event.clientX,
                top: event.clientY,
                piece: `${piece.color}${piece.type}`,
                idFrom: event.target.id
            });

            const cellsToHighlight = this.props.game.moves({
                square: event.target.id,
                verbose: true
            }).map(move => move.to);

            this.props.setCellsToHighlight(cellsToHighlight);
        }
    }

    handleMouseUpOnBoard(event) {
        if(!this.props.travelingPiece) return;
        this.props.setTravelingPiece(null);
        this.props.setCellsToHighlight(null);
        const move = this.props.game.move({
            from: this.props.travelingPiece.idFrom,
            to: event.target.id,
            promotion: "q"
        });
        if(move) {
            this.props.setGame(this.props.game);
        }
    }

    handleMouseLeaveFromBoard(event) {
        if(!this.props.travelingPiece) return;
        this.props.setTravelingPiece(null);
        this.props.setCellsToHighlight(null);
    }

    render() {
        return(
            <div className="game-container">
                <div/>
                <ChessBoard
                    fen={this.props.game.fen()}
                    cellsToHighlight={this.props.cellsToHighlight}
                    travelingPiece = {this.props.travelingPiece}
                    onMouseDown={this.handleMouseDownOnBoard}
                    onMouseUp={this.handleMouseUpOnBoard}
                    onMouseLeave={this.handleMouseLeaveFromBoard}
                    orientation={"w"}
                />
                <div/>
            </div>
        );
    }

}

export default ChessGame;