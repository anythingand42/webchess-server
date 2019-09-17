import React from "react";
import { connect } from "react-redux";
import ChessGame from "./ChessGame_standard.js";
import {
    setTravelingPiece,
    setCellsToHighlight,
    setGame,
    setFen,
    setPgn,
    setOrientation,
    setOpponentSocketId,
    setWhiteRestOfTime,
    setBlackRestOfTime
} from "../../../store/ChessGame_standard/actions";

class ConnectedChessGame extends React.Component {
    render() {
        return(
            <ChessGame
                socket={this.props.socket}
                game={this.props.game}
                fen={this.props.fen}
                pgn={this.props.pgn}
                orientation={this.props.orientation}
                travelingPiece={this.props.travelingPiece}
                cellsToHighlight={this.props.cellsToHighlight}
                setTravelingPiece={this.props.setTravelingPiece}
                setCellsToHighlight={this.props.setCellsToHighlight}
                opponentSocketId={this.props.opponentSocketId}
                whiteRestOfTime={this.props.whiteRestOfTime}
                blackRestOfTime={this.props.blackRestOfTime}
                setGame={this.props.setGame}
                setFen={this.props.setFen}
                setPgn={this.props.setPgn}
                setOrientation={this.props.setOrientation}
                setOpponentSocketId={this.props.setOpponentSocketId}
                setWhiteRestOfTime={this.props.setWhiteRestOfTime}
                setBlackRestOfTime={this.props.setBlackRestOfTime}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        travelingPiece: state.chessGame_standard.travelingPiece,
        cellsToHighlight: state.chessGame_standard.cellsToHighlight,
        game: state.chessGame_standard.game,
        fen: state.chessGame_standard.fen,
        pgn: state.chessGame_standard.pgn,
        orientation: state.chessGame_standard.orientation,
        opponentSocketId: state.chessGame_standard.opponentSocketId,
        whiteRestOfTime: state.chessGame_standard.whiteRestOfTime,
        blackRestOfTime: state.chessGame_standard.blackRestOfTime
    }
};

const mapDispatchToProps = {
    setTravelingPiece,
    setCellsToHighlight,
    setGame,
    setFen,
    setPgn,
    setOrientation,
    setOpponentSocketId,
    setWhiteRestOfTime,
    setBlackRestOfTime
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedChessGame);