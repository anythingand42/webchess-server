import React from "react";
import ChessBoard from "../ChessBoard";
import ChessTimer from "../ChessTimer";
import cookies from "browser-cookies";
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
        this.props.socket.on("game_over", (data) => {
            this.props.setResult(data.result);
            clearInterval(this.whiteTimer);
            clearInterval(this.blackTimer);
            cookies.erase("webchessGame");
            this.props.mainSetGame(null);
            this.props.socket.removeAllListeners("send_move_to_client");
            this.props.socket.removeAllListeners("send_game_options_to_client");
            this.props.socket.removeAllListeners("game_over");
        });
        this.props.socket.emit("chess_game_connection", document.cookie);
    }

    componentWillUnmount() {
        this.props.socket.removeAllListeners("send_move_to_client");
        this.props.socket.removeAllListeners("send_game_options_to_client");
        this.props.socket.removeAllListeners("game_over");
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
        let result = this.props.game.game_over();
        if(result) {
            const opponentColor = this.props.orientation === "b" ? "w" : "b";

            if(this.props.game.in_checkmate()) {
                this.props.socket.emit("game_over", {
                    result: opponentColor,
                    opponentSocketId: this.props.opponentSocketId
                });
            }

            if(this.props.game.in_draw()) {
                this.props.socket.emit("game_over", {
                    result: "d",
                    opponentSocketId: this.props.opponentSocketId
                });
            }

        }
    }

    handleMouseDownOnBoard(event) {
        if(this.props.result) return;
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
        if(this.props.result) return;
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

    setChessClock() {
        if(this.props.game.turn() === "w") { 
            clearInterval(this.blackTimer);
            this.whiteTimer = setInterval(() => {
                if(this.props.whiteRestOfTime > 0) {
                    this.props.setWhiteRestOfTime(this.props.whiteRestOfTime - 100);
                } else {
                    clearInterval(this.whiteTimer);
                    if(this.props.orientation === "w") {
                        this.props.socket.emit("game_over", {
                            result: "b",
                            opponentSocketId: this.props.opponentSocketId
                        });
                    }
                }
            }, 100);
        }
        if(this.props.game.turn() === "b") { 
            clearInterval(this.whiteTimer);
            this.blackTimer = setInterval(() => {
                if(this.props.blackRestOfTime > 0) {
                    this.props.setBlackRestOfTime(this.props.blackRestOfTime - 100);
                } else {
                    clearInterval(this.blackTimer);
                    if(this.props.orientation === "b") {
                        this.props.socket.emit("game_over", {
                            result: "w",
                            opponentSocketId: this.props.opponentSocketId
                        });
                    }
                }
            }, 100);
        }
    }

    getResultMsg(result) {
        if(result === "w") return "white won";
        if(result === "b") return "black won";
        if(result === "d") return "draw";
    }

    render() {
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
                        {this.props.result &&
                            <div>
                                {this.getResultMsg(this.props.result)}
                            </div>
                        }
                        <ChessTimer valueInMs={this.props.blackRestOfTime}/>
                    </div>
                }
                {this.props.orientation === "w" &&
                    <div>
                        <ChessTimer valueInMs={this.props.blackRestOfTime}/>
                        {this.props.result &&
                            <div>
                                {this.getResultMsg(this.props.result)}
                            </div>
                        }
                        <ChessTimer valueInMs={this.props.whiteRestOfTime}/>
                    </div>
                }
            </div>
        );
    }

}

export default ChessGame_standard;