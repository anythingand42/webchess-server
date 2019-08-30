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

        this.state = {
            cells: this.cells,
            travelingPiece: this.travelingPiece,
            orientation: this.props.orientation
        };

        this.setStartPosition = this.setStartPosition.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.board = React.createRef();

        this.draggable = !!props.draggable;
        this.position = props.position;
        this.onDragStart = props.onDragStart;
        this.onDrop = props.onDrop;
        this.highlightOnDragStart = props.highlightOnDragStart;
        this.highlightOnDrop = props.highlightOnDrop;
        this.orientation = props.orientation;

        if(!this.position) {
            this.setEmptyBoard();
        } else if (this.position === "start") {
            this.setStartPosition();
        } else {
            this.setCellsFromFen(this.position);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.draggable = !!nextProps.draggable;
        this.position = nextProps.position;
        this.onDragStart = nextProps.onDragStart;
        this.onDrop = nextProps.onDrop;
        this.highlightOnDragStart = nextProps.highlightOnDragStart;
        this.highlightOnDrop = nextProps.highlightOnDrop;
        this.orientation = nextProps.orientation;

        if(!this.position) {
            this.setEmptyBoard();
        } else if (this.position === "start") {
            this.setStartPosition();
        } else {
            this.setCellsFromFen(this.position);
        }
        this.setReactBoardState();
    }
    shouldComponentUpdate() {
        console.log("update board");
        return true;
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     this.draggable = !!nextProps.draggable;
    //     this.position = nextProps.position;
    //     this.onDragStart = nextProps.onDragStart;
    //     this.onDrop = nextProps.onDrop;
    //     this.highlightOnDragStart = nextProps.highlightOnDragStart;
    //     this.highlightOnDrop = nextProps.highlightOnDrop;
    //     this.orientation = nextProps.orientation || "w";
    //
    //     if(!this.position) {
    //         this.setEmptyBoard();
    //     } else if (this.position === "start") {
    //         this.setStartPosition();
    //     } else {
    //         this.setCellsFromFen(this.position);
    //     }
    //
    //     return true;
    // }

    turnBoard() {
        if(this.orientation === "w") {
            this.orientation = "b";
        } else {
            this.orientation = "w";
        }
    }

    setEmptyBoard() {
        this.cells.forEach((cell) => {
            cell.piece = null;
        });
        this.travelingPiece = null;
        this.removeAllHighlighters();
    }

    setStartPosition() {
        let game = new Chess();
        this.setCellsFromGame(game);
        this.travelingPiece = null;
        this.removeAllHighlighters();
    }

    handleMouseDown(event) {
        event.preventDefault();
        if(!this.draggable) return;

        const id = event.target.id;

        const piece = this.cells[this.convertToNumId(id)].piece;
        if(piece === null) return;
        this.cells[this.convertToNumId(id)].piece = null;
        this.removeAllHighlighters();
        if(this.onDragStart) {
            this.onDragStart(id);
        }
        if(this.highlightOnDragStart) {
            let cellsToHighlight = this.highlightOnDragStart(id);
            cellsToHighlight.forEach((cellId) => {
                this.cells[this.convertToNumId(cellId)].highlight = true;
            });
        }

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

        const idTo = event.target.id;
        const idFrom = this.state.travelingPiece.idFrom;
        const piece = this.state.travelingPiece.piece;

        this.travelingPiece = null;
        this.removeAllHighlighters();
        if(this.onDrop) {
            if( this.onDrop(idFrom, idTo) ) {
                this.cells[this.convertToNumId(idTo)].piece = piece;
            } else {
                this.cells[this.convertToNumId(idFrom)].piece = piece;
            }
        } else {
            this.cells[this.convertToNumId(idTo)].piece = piece;
        }
        if(this.highlightOnDrop) {
            let cellsToHighlight = this.highlightOnDrop(idFrom, idTo);
            if (cellsToHighlight) {
                cellsToHighlight.forEach((cellId) => {
                    this.cells[this.convertToNumId(cellId)].highlight = true;
                });
            }
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

    setCellsFromFen(fen) {
        let game = new Chess(fen);
        this.setCellsFromGame(game);
    }

    setCellsFromGame(game) {
        for(let i = 0; i < 64; i++) {
            const id = this.convertToStrId(i);
            let piece = game.get(id);
            if(piece !== null) {
                piece = piece.color + piece.type;
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
            orientation: this.orientation
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
        console.log(this.state.orientation);
        if(this.state.orientation === "b") {
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
                <Styles.Div>
                    <Styles.ChessBoard ref={this.board} onMouseDown={this.handleMouseDown}>
                        {cells}
                    </Styles.ChessBoard>
                    <Styles.Dummy/>
                </Styles.Div>
            )
        } else {
            return (
                <Styles.Div>
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
                        width={this.board.current.offsetWidth/8}
                        height={this.board.current.offsetWidth/8}
                        piece={this.state.travelingPiece.piece}
                    />
                    <Styles.Dummy/>
                </Styles.Div>
            )
        }
    }
}

export default ChessBoard;