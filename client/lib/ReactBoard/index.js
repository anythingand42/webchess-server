import React, {Fragment} from "react";
import Cell from "./Cell";
import DraggedPiece from "./DraggedPiece";

class ReactBoard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.getCellsForRender = this.getCellsForRender.bind(this);
    }

    onMouseDown({id, clientX, clientY}) {
        this.props.onMouseDown && this.props.onMouseDown({id, clientX, clientY});
    }

    onMouseUp(id) {
        this.props.onMouseUp && this.props.onMouseUp(id);
    }

    onMouseLeave(event) {
        event.preventDefault();
        this.props.onMouseLeave && this.props.onMouseLeave();
    }

    getCellsForRender() {
        const {board, columnsNumber = 8, rowsNumber = 8} = this.props;
        const cellsToRender = [];
        for(let i = 0; i < rowsNumber; i++) {
            for(let j = 0; j < columnsNumber; j++) {
                let color;
                if(i % 2 === 0) {
                    color = j % 2 === 0 ? "w" : "b";
                } else {
                    color = j % 2 === 1 ? "w" : "b";
                }
                console.log();
                cellsToRender.push(<Cell
                    key={`${i}${j}`}
                    id={`${i}${j}`}
                    color={color}
                    pieceImg={(board && board[`${i}${j}`]) ? (board[`${i}${j}`].img || "") : "" }
                    isPieceTransparent={(board && board[`${i}${j}`]) ? (board[`${i}${j}`].isPieceTransparent || "") : ""}
                    isHighlighted={(board && board[`${i}${j}`]) ? (board[`${i}${j}`].isHighlighted || "") : "" }
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                />);
            }
        }
        return cellsToRender;
    }
    
    render() {
        const {
            draggedPiece,
            boardWidthInPx = 600,
            boardHeightInPx = 600,
            columnsNumber = 8,
            rowsNumber = 8
        } = this.props;
        const boardStyle = {
            width: `${boardWidthInPx}px`,
            height: `${boardHeightInPx}px`,
            display: "grid",
            gridTemplateColumns: `repeat(${columnsNumber}, ${100/columnsNumber}%)`,
            gridTemplateRows: `repeat(${rowsNumber}, ${100/rowsNumber}%)`
        };
        const cellsToRender = this.getCellsForRender();
        return (
            <Fragment>
                <div
                    style={boardStyle}
                    onMouseLeave={this.onMouseLeave}>
                    {cellsToRender}
                </div>
                {draggedPiece &&
                    <DraggedPiece
                        top={draggedPiece.top || 0}
                        left={draggedPiece.left || 0}
                        height={boardHeightInPx/rowsNumber}
                        width={boardWidthInPx/columnsNumber}
                        pieceImg={draggedPiece.img || ""}
                    />
                }
            </Fragment>
        );
    }
}

export default ReactBoard;