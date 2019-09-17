import React, {Component} from "react";
import "./style.css";
import Chess from "chess.js";
import Cell from "./Cell";
import Piece from "./Piece";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.board = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    getCellsFromFen(fen) {
        let game;
        if(fen === "start") {
            game = new Chess();
        } else {
            game = new Chess(fen);
        }

        let cells = [];
        for(let i = 0; i < 64; i++) {
            const id = this.convertToStrId(i);
            let piece = game.get(id);
            if(piece !== null) {
                piece = piece.color + piece.type;
                cells[i] = {id: id, piece: piece};
            } else {
                cells[i] = {id: id, piece: piece};
            }
        }

        return cells;
    }

    getReactCells(cells, orientation) {
        let reactCells = [];

        if(orientation === "b") {
            for(let i = 63; i >= 0; i--) {
                reactCells.push(<Cell
                    key={cells[i].id}
                    id={cells[i].id}
                    piece={cells[i].piece}
                    highlight={cells[i].highlight}
                    transparentPiece={cells[i].transparentPiece}
                />);
            }
        } else {
            reactCells = cells.map(cell => {
                return <Cell
                    key={cell.id}
                    id={cell.id}
                    piece={cell.piece}
                    highlight={cell.highlight}
                    transparentPiece={cell.transparentPiece}
                />
            });
        }

        return reactCells;
    }

    convertToNumId(strId) {
        let splittedId = strId.split("");
        splittedId[0] = splittedId[0].charCodeAt(0) - 96;
        return Number(splittedId[0]) + (8 - Number(splittedId[1]) ) * 8 - 1;
    }

    convertToStrId(numId) {
        numId++;
        let firstChar;
        let secondChar;
        if(numId % 8 === 0) {
            firstChar = "h";
            secondChar = String(9 - numId/8);
        } else {
            firstChar = String.fromCharCode((numId % 8) + 96);
            secondChar = String(8 - Math.floor(numId/8));
        }
        return `${firstChar}${secondChar}`;
    }

    handleMouseDown(event) {
        event.preventDefault();
        if(this.props.onMouseDown) {
            this.props.onMouseDown(event);
        }
    }

    handleMouseUp(event) {
        event.preventDefault();
        if(this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
    }

    handleMouseLeave(event) {
        event.preventDefault();
        if(this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    }

    render() {
        let cells = this.getCellsFromFen(this.props.fen);

        if(this.props.travelingPiece) {
            if(this.props.travelingPiece.idFrom) {
                cells[this.convertToNumId(this.props.travelingPiece.idFrom)].transparentPiece = true;
            }
        }

        if(this.props.cellsToHighlight) {
            this.props.cellsToHighlight.forEach((id) => {
                cells[this.convertToNumId(id)].highlight = true;
            });
        }

        const reactCells = this.getReactCells(cells, this.props.orientation);
        return (
            <div
                className="chess-board-container"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className="chess-board-kostyl">
                    <div
                        className="chess-board"
                        ref={this.board}
                    >
                        {reactCells}
                    </div>
                </div>
                {this.props.travelingPiece &&
                    <Piece
                        width={this.board.current ? this.board.current.offsetWidth/8 : 50}
                        height={this.board.current ? this.board.current.offsetHeight/8 : 50}
                        top={this.props.travelingPiece.top}
                        left={this.props.travelingPiece.left}
                        piece={this.props.travelingPiece.piece}
                    />
                }
            </div>
        )
    }
}

export default ChessBoard;