import React, {Component} from "react";
import Chat from "./Chat";
import ChessBoard from "./ChessBoard";
import ChessTimer from "./ChessTimer";
import Styles from "./styles.js";
import Chess from "chess.js";

class ChessGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fen: "start",
            restOfTime: props.restOfTime
        };

        this.game = new Chess();
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on("send_fen_to_client", (fen, restOfTime) => {
            if(this.state.fen !== fen) {
                this.game = new Chess(fen);
                this.setState({
                    fen: fen,
                    restOfTime: restOfTime
                });
            }
        });
        this.socket.emit("get_fen_from_server");
    }

    render() {
        return(
            <Styles.MainDiv>
                <Styles.ChatDiv>
                    <Chat socket={this.socket}/>
                </Styles.ChatDiv>
                <Styles.BoardDiv>
                    <ChessBoard
                        orientation={this.props.color}
                        draggable={true}
                        position={this.state.fen}
                        highlightOnDragStart={(idFrom) => {
                            if (this.game.turn() === this.props.color) {
                                return this.game.moves({square: idFrom, verbose: true}).map(current => {
                                    return current.to;
                                });
                            }
                        }}
                        onDrop={(idFrom, idTo) => {
                            if (this.game.turn() !== this.props.color) return false;
                            if(idFrom === idTo) return false;

                            let move = this.game.move({ from: idFrom, to: idTo, promotion:"q" });
                            if(move !== null) {
                                let fen = this.game.fen();
                                this.socket.emit("send_fen_to_server", this.game.fen());
                                return fen;
                            } else {
                                return false;
                            }
                        }}
                    />
                </Styles.BoardDiv>
                <ChessTimer
                    value={this.state.restOfTime}
                    isRunning={this.game.turn() === this.props.color}
                />
            </Styles.MainDiv>
        );
    }
}

export default ChessGame;