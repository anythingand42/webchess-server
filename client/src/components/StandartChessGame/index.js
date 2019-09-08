import React, {Component} from "react";
import Styles from "./styles.js"
import Chess from "chess.js";
//import Chat from "./Chat";
import ChessBoard from "./ChessBoard";
//import ChessTimer from "./ChessTimer";

class StandartChessGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new Chess(),
            travelingPiece: null
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDragStart(event) {
        const pieceObj = this.state.game.get(event.target.id);
        let travelingPiece = null;
        if(pieceObj !== null) {
            const piece = pieceObj.color + pieceObj.type;
            travelingPiece = {
                top: event.clientY,
                left: event.clientX,
                piece: piece,
                idFrom: event.target.id
            }
        }
        this.setState({
            travelingPiece: travelingPiece
        });
    }

    handleDrop(event) {
        const game = this.state.game;
        const move = game.move({
            from: this.state.travelingPiece.idFrom,
            to: event.target.id,
            promotion:"q"
        });
        if(move) {
            this.setState({
                game: game,
                travelingPiece: null
            });
        } else {
            this.setState({
                travelingPiece: null
            });
        }
    }

    render() {
        return (
            <Styles.MainDiv>
                <Styles.ChatDiv>
                    <div/>
                </Styles.ChatDiv>
                <Styles.BoardDiv>
                    <ChessBoard
                        fen={this.state.game.fen()}
                        orientation="w"
                        onDragStart={this.handleDragStart}
                        onDrop={this.handleDrop}
                        travelingPiece={this.state.travelingPiece}
                    />
                </Styles.BoardDiv>
                <div/>
            </Styles.MainDiv>
        )
    }
}

export default StandartChessGame;