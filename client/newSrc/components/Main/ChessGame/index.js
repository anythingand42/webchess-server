import React from "react";
import { connect } from "react-redux";
import ChessGame from "./ChessGame.js";
import {
    setTravelingPiece,
    setCellsToHighlight,
    setGame
} from "../../../store/ChessGame/actions";

class ConnectedChessGame extends React.Component {
    render() {
        return(
            <ChessGame
                game={this.props.game}
                travelingPiece={this.props.travelingPiece}
                cellsToHighlight={this.props.cellsToHighlight}
                setTravelingPiece={this.props.setTravelingPiece}
                setCellsToHighlight={this.props.setCellsToHighlight}
                setGame={this.props.setGame}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        travelingPiece: state.chessGame.travelingPiece,
        cellsToHighlight: state.chessGame.cellsToHighlight,
        game: state.chessGame.game
    }
};

const mapDispatchToProps = {
    setTravelingPiece: setTravelingPiece,
    setCellsToHighlight: setCellsToHighlight,
    setGame: setGame
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedChessGame);