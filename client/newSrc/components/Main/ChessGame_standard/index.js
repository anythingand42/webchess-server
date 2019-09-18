import React from "react";
import { connect } from "react-redux";
import ChessGame from "./ChessGame_standard.js";
import {
    setDraggedPiece,
    setCellsToHighlight,
    setFen,
    setPgn,
    setOrientation,
    setOpponentSocketId,
    setWhiteRestOfTime,
    setBlackRestOfTime,
    setResult,
    reset
} from "../../../store/ChessGame_standard/actions";

class ConnectedChessGame extends React.Component {
    render() {
        return(
            <ChessGame
                socket={this.props.socket}
                fen={this.props.fen}
                pgn={this.props.pgn}
                orientation={this.props.orientation}
                draggedPiece={this.props.draggedPiece}
                cellsToHighlight={this.props.cellsToHighlight}
                setDraggedPiece={this.props.setDraggedPiece}
                setCellsToHighlight={this.props.setCellsToHighlight}
                opponentSocketId={this.props.opponentSocketId}
                whiteRestOfTime={this.props.whiteRestOfTime}
                blackRestOfTime={this.props.blackRestOfTime}
                result={this.props.result}
                setFen={this.props.setFen}
                setPgn={this.props.setPgn}
                setOrientation={this.props.setOrientation}
                setOpponentSocketId={this.props.setOpponentSocketId}
                setWhiteRestOfTime={this.props.setWhiteRestOfTime}
                setBlackRestOfTime={this.props.setBlackRestOfTime}
                setResult={this.props.setResult}
                mainSetGame={this.props.mainSetGame}
                reset={this.props.reset}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        draggedPiece: state.chessGame_standard.draggedPiece,
        cellsToHighlight: state.chessGame_standard.cellsToHighlight,
        fen: state.chessGame_standard.fen,
        pgn: state.chessGame_standard.pgn,
        orientation: state.chessGame_standard.orientation,
        opponentSocketId: state.chessGame_standard.opponentSocketId,
        whiteRestOfTime: state.chessGame_standard.whiteRestOfTime,
        blackRestOfTime: state.chessGame_standard.blackRestOfTime,
        result: state.chessGame_standard.result
    }
};

const mapDispatchToProps = {
    setDraggedPiece,
    setCellsToHighlight,
    setFen,
    setPgn,
    setOrientation,
    setOpponentSocketId,
    setWhiteRestOfTime,
    setBlackRestOfTime,
    setResult,
    reset
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedChessGame);