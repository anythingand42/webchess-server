import React, {Component} from "react";
import Styles from "./styles.js";
import Chess from "chess.js";
import Cell from "./Cell";
import Piece from "./Piece";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.board = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
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
                />);
            }
        } else {
            reactCells = cells.map(cell => {
                return <Cell
                    key={cell.id}
                    id={cell.id}
                    piece={cell.piece}
                    highlight={cell.highlight}
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
        this.props.onDragStart(event);
    }

    handleMouseUp(event) {
        this.props.onDrop(event);
    }

    render() {
        let cells = this.getCellsFromFen(this.props.fen);
        if(this.props.travelingPiece) {
            cells[this.convertToNumId(this.props.travelingPiece.idFrom)].piece = null;
        }
        const reactCells = this.getReactCells(cells, this.props.orientation);
        return (
            <Styles.Div>
                <Styles.ChessBoard
                    ref={this.board}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    {reactCells}
                </Styles.ChessBoard>
                <Styles.Dummy/>
                {this.props.travelingPiece &&
                    <Piece
                        width={this.board.current.offsetWidth/8}
                        height={this.board.current.offsetHeight/8}
                        top={this.props.travelingPiece.top}
                        left={this.props.travelingPiece.left}
                        piece={this.props.travelingPiece.piece}
                    />
                }
            </Styles.Div>
        )
    }
}

export default ChessBoard;