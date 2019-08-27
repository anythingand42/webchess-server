import Chess from "chess.js";
import React, {Component} from "react";
import Cell from "./Cell";
import Piece from "./Piece";
import Styles from "./styles.js";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.cells = [];
        for(let i = 0; i < 64; i++) {
            const id = this.convertToStrId(i);
            this.cells.push({
                id: id,
                piece: null,
                highlight: false
            });
        }
        this.travelingPiece = null;
        this.reverse = false;
        this.state = {
            cells: this.cells,
            travelingPiece: this.travelingPiece,
            reverse: this.reverse
        };
        this.game = null;
        this.setStartPosition = this.setStartPosition.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentDidMount() {
        this.setStartPosition();
    }

    turnBoard() {
        this.reverse = !this.reverse;
    }

    setEmptyBoard() {
        for(let i = 0; i < 64; i++) {
            const id = this.convertToStrId(i);
            this.cells.push({
                id: id,
                piece: null
            });
        }
        this.travelingPiece = null;
        this.removeAllHighlighters();
        this.setReactBoardState();
    }

    setStartPosition() {
        this.game = new Chess();
        this.setCellsFromGame();
        this.travelingPiece = null;
        this.removeAllHighlighters();
        this.setReactBoardState();
    }

    handleMouseDown(event) {
        event.preventDefault();
        const id = event.target.id;

        const piece = this.cells[this.convertToNumId(id)].piece;
        if(piece === null) return;
        //console.log(this.game.moves({square: id, verbose: true}));
        let availableCells = this.game.moves({square: id, verbose: true}).map(current => {
            return this.convertToNumId(current.to);
        });
        availableCells.forEach((current) => {
            this.cells[current].highlight = true;
        });

        this.cells[this.convertToNumId(id)].piece = null;

        this.travelingPiece = {
            piece: piece,
            left: event.clientX,
            top: event.clientY,
            idFrom: id
        };

        this.setReactBoardState();
    }

    handleMouseUp(event) {
        event.preventDefault();
        if(this.travelingPiece === null) return;

        const id = event.target.id;
        const idFrom = this.state.travelingPiece.idFrom;
        const piece = this.state.travelingPiece.piece;

        this.removeAllHighlighters();
        this.travelingPiece = null;

        if(id !== idFrom) {
            let move = this.game.move({ from: idFrom, to: id, promotion:"q" });
            console.log(move);
            if( move === null ) {
                this.cells[this.convertToNumId(idFrom)].piece = piece;
            } else {
                this.setCellsFromGame();
            }
        } else {
            this.cells[this.convertToNumId(idFrom)].piece = piece;
        }

        this.setReactBoardState();
    }

    handleMouseLeave(event) {
        event.preventDefault();
        if(this.travelingPiece === null) return;

        const id = this.state.travelingPiece.idFrom;
        const piece = this.state.travelingPiece.piece;

        this.removeAllHighlighters();
        this.cells[this.convertToNumId(id)].piece = piece;
        this.travelingPiece = null;

        this.setReactBoardState();
    }

    removeAllHighlighters() {
        this.cells.forEach((current) => {
            current.highlight = false;
        });
    }

    setCellsFromGame() {
        for(let i = 0; i < 64; i++) {
            const id = this.convertToStrId(i);
            let piece = this.game.get(id);
            if(piece !== null) {
                if(piece.color === "w") {
                    piece = piece.type.toUpperCase();
                } else {
                    piece = piece.type;
                }
                this.cells[i] = {id: id, piece: piece};
            } else {
                this.cells[i] = {id: id, piece: piece};
            }
        }
    }

    setReactBoardState() {
        this.setState({
            cells: this.cells,
            travelingPiece: this.travelingPiece,
            reverse: this.reverse
        });
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

    render() {
        let cells = [];
        if(this.state.reverse) {
            for(let i = 63; i >= 0; i--) {
                cells.push(<Cell
                    key={this.state.cells[i].id}
                    id={this.state.cells[i].id}
                    piece={this.state.cells[i].piece}
                    highlight={this.state.cells[i].highlight}
                />);
            }
        } else {
            cells = this.state.cells.map(cell => {
                return <Cell key={cell.id} id={cell.id} piece={cell.piece} highlight={cell.highlight}/>
            });
        }

        if(this.state.travelingPiece === null) {
            return (
                <div>
                    <Styles.ChessBoard onMouseDown={this.handleMouseDown}>
                        {cells}
                    </Styles.ChessBoard>
                </div>
            )
        } else {
            return (
                <div>
                    <Styles.ChessBoard
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        onMouseLeave={this.handleMouseLeave}
                    >
                        {cells}
                    </Styles.ChessBoard>
                    <Piece
                        left={this.state.travelingPiece.left}
                        top={this.state.travelingPiece.top}
                        width={50}
                        height={50}
                        piece={this.state.travelingPiece.piece}
                    />
                </div>
            )
        }
    }
}

export default ChessBoard;