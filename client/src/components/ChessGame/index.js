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
            fen: "start"
        };
        // this.color = props.color;
        this.game = new Chess();

        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on("send_fen_to_client", (fen) => {
            //this.game.move({from: move.from, to: move.to});
            if(this.state.fen !== fen) {
                this.game = new Chess(fen);
                this.setState({fen: fen});
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
                        draggable={this.game.turn() === this.props.color}
                        position={this.state.fen}
                        highlightOnDragStart={(idFrom) => {
                            return this.game.moves({square: idFrom, verbose: true}).map(current => {
                                return current.to;
                            });
                        }}
                        onDrop={(idFrom, idTo) => {
                            if(idFrom === idTo) return false;

                            let move = this.game.move({ from: idFrom, to: idTo, promotion:"q" });
                            if(move !== null) {
                                this.socket.emit("send_fen_to_server", this.game.fen());
                                return true;
                            } else {
                                return false;
                            }
                        }}
                    />
                </Styles.BoardDiv>
                <ChessTimer/>
            </Styles.MainDiv>
        );
    }
}

export default ChessGame;