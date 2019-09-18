import React from "react";
import { connect } from "react-redux";
import ChessGame from "./ChessGame.js";
import {
    setDraggedPiece,
    setCellsToHighlight,
    setGame
} from "../../../store/ChessGame/actions";

class ConnectedChessGame extends React.Component {
    render() {
        return(
            <ChessGame
                game={this.props.game}
                draggedPiece={this.props.draggedPiece}
                cellsToHighlight={this.props.cellsToHighlight}
                setDraggedPiece={this.props.setDraggedPiece}
                setCellsToHighlight={this.props.setCellsToHighlight}
                setGame={this.props.setGame}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        draggedPiece: state.chessGame.draggedPiece,
        cellsToHighlight: state.chessGame.cellsToHighlight,
        game: state.chessGame.game
    }
};

const mapDispatchToProps = {
    setDraggedPiece,
    setCellsToHighlight,
    setGame
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedChessGame);