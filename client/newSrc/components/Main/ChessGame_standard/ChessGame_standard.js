import React from "react";
import ChessBoard from "../ChessBoard";
import ChessTimer from "../ChessTimer"
import "./style.css";

class ChessGame_standard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleMouseDownOnBoard = this.handleMouseDownOnBoard.bind(this);
        this.handleMouseUpOnBoard = this.handleMouseUpOnBoard.bind(this);
        this.handleMouseLeaveFromBoard = this.handleMouseLeaveFromBoard.bind(this);
        this.handleSendMoveToClient = this.handleSendMoveToClient.bind(this);
        this.handleSendGameOptionsToClient = this.handleSendGameOptionsToClient.bind(this);
        this.setChessClock = this.setChessClock.bind(this);
        this.whiteTimer = null;
        this.blackTimer = null;
    }

    componentDidMount() {
        this.props.socket.on("send_move_to_client", this.handleSendMoveToClient);
        this.props.socket.on("send_game_options_to_client", this.handleSendGameOptionsToClient);
        this.props.socket.emit("chess_game_connection", document.cookie);
    }

    componentWillUnmount() {
        this.props.socket.removeAllListeners("send_move_to_client");
    }

    handleSendGameOptionsToClient(options) {
        if(options.opponentSocketId) this.props.setOpponentSocketId(options.opponentSocketId);
        if(options.orientation) this.props.setOrientation(options.orientation);
        if(options.pgn) {
            this.props.setPgn(options.pgn);
            this.props.game.load_pgn(options.pgn);
            this.props.setGame(this.props.game);
            this.props.setFen(this.props.game.fen());
        }
        console.log("options", options);
        if(options.whiteRestOfTime) this.props.setWhiteRestOfTime(options.whiteRestOfTime);
        if(options.blackRestOfTime) this.props.setBlackRestOfTime(options.blackRestOfTime);
        this.setChessClock();
    }

    setChessClock() {
        if(this.props.game.turn() === "w") { 
            clearInterval(this.blackTimer);
            this.whiteTimer = setInterval(() => {
                this.props.setWhiteRestOfTime(this.props.whiteRestOfTime - 100);
            }, 100);
        }
        if(this.props.game.turn() === "b") { 
            clearInterval(this.whiteTimer);
            this.blackTimer = setInterval(() => {
                this.props.setBlackRestOfTime(this.props.blackRestOfTime - 100);
            }, 100);
        }
    }

    handleSendMoveToClient(data) {
        this.props.game.move({
            from: data.idFrom,
            to: data.idTo,
            promotion: "q"
        });
        this.props.setGame(this.props.game);
        this.props.setFen(this.props.game.fen());
        this.props.setWhiteRestOfTime(data.whiteRestOfTime);
        this.props.setBlackRestOfTime(data.blackRestOfTime);

        this.setChessClock();
    }

    handleMouseDownOnBoard(event) {
        if(this.props.orientation !== this.props.game.turn()) return;

        const piece = this.props.game.get(event.target.id);
        if(piece) {
            this.props.setTravelingPiece({
                left: event.clientX,
                top: event.clientY,
                piece: `${piece.color}${piece.type}`,
                idFrom: event.target.id
            });

            const cellsToHighlight = this.props.game.moves({
                square: event.target.id,
                verbose: true
            }).map(move => move.to);

            this.props.setCellsToHighlight(cellsToHighlight);
        }
    }

    handleMouseUpOnBoard(event) {
        if(!this.props.travelingPiece) return;

        const idFrom = this.props.travelingPiece.idFrom;
        const idTo = event.target.id;
        const move = this.props.game.move({
            from: idFrom,
            to: idTo,
            promotion: "q"
        });

        this.props.setTravelingPiece(null);
        this.props.setCellsToHighlight(null);

        if(move) {
            this.props.socket.emit("send_move_to_server", {
                idFrom: idFrom,
                idTo: idTo,
                opponentSocketId: this.props.opponentSocketId,
                pgn: this.props.game.pgn(),
                whiteRestOfTime: this.props.whiteRestOfTime,
                blackRestOfTime: this.props.blackRestOfTime
            });
            this.props.setGame(this.props.game);
            this.props.setFen(this.props.game.fen());

            this.setChessClock();
        }
    }

    handleMouseLeaveFromBoard(event) {
        if(!this.props.travelingPiece) return;
        this.props.setTravelingPiece(null);
        this.props.setCellsToHighlight(null);
    }

    render() {
        console.log(this.props)
        return(
            <div className="game-container">
                <div />
                <ChessBoard
                    fen={this.props.fen}
                    cellsToHighlight={this.props.cellsToHighlight}
                    travelingPiece = {this.props.travelingPiece}
                    onMouseDown={this.handleMouseDownOnBoard}
                    onMouseUp={this.handleMouseUpOnBoard}
                    onMouseLeave={this.handleMouseLeaveFromBoard}
                    orientation={this.props.orientation}
                />
                {this.props.orientation === "b" &&
                    <div>
                        <ChessTimer valueInMs={this.props.whiteRestOfTime}/>
                        <ChessTimer valueInMs={this.props.blackRestOfTime}/>
                    </div>
                }
                {this.props.orientation === "w" &&
                    <div>
                        <ChessTimer valueInMs={this.props.blackRestOfTime}/>
                        <ChessTimer valueInMs={this.props.whiteRestOfTime}/>
                    </div>
                }
            </div>
        );
    }

}

export default ChessGame_standard;