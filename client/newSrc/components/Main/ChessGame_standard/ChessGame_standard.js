import React from "react";
import ChessBoard from "../ChessBoard";
import ChessTimer from "../ChessTimer";
import cookies from "browser-cookies";
import "./style.css";
import Chess from "chess.js";

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
        this.chessGame = new Chess();
        this.isActive = false;
        this.incInMs = 0;
    }

    componentDidMount() {
        this.props.socket.on("send_move_to_client", this.handleSendMoveToClient);
        this.props.socket.on("send_game_options_to_client", this.handleSendGameOptionsToClient);
        this.props.socket.on("game_over", (data) => {
            this.props.setResult(data.result);
            clearInterval(this.whiteTimer);
            clearInterval(this.blackTimer);
            cookies.erase("webchessGame");
            this.props.socket.removeAllListeners("send_move_to_client");
            this.props.socket.removeAllListeners("send_game_options_to_client");
            this.props.socket.removeAllListeners("game_over");
            this.props.mainSetGame(null);
        });
        this.props.socket.emit("chess_game_connection", document.cookie);
    }

    componentWillUnmount() {
        this.props.socket.emit("standard_chess_game_disconnect");
        this.props.socket.removeAllListeners("send_move_to_client");
        this.props.socket.removeAllListeners("send_game_options_to_client");
        this.props.socket.removeAllListeners("game_over");
        clearInterval(this.whiteTimer);
        clearInterval(this.blackTimer);
        this.props.reset();
    }

    handleSendGameOptionsToClient(options) {
        if(options.opponentSocketId) this.props.setOpponentSocketId(options.opponentSocketId);
        if(options.orientation) this.props.setOrientation(options.orientation);
        if(options.pgn) {
            this.props.setPgn(options.pgn);
            this.chessGame.load_pgn(options.pgn);
            this.props.setFen(this.chessGame.fen());
        }
        if(options.whiteRestOfTime) this.props.setWhiteRestOfTime(options.whiteRestOfTime);
        if(options.blackRestOfTime) this.props.setBlackRestOfTime(options.blackRestOfTime);
        if(options.incInMs) this.incInMs = options.incInMs;
        this.setChessClock();
        this.isActive = true;
    }

    handleSendMoveToClient(data) {
        this.chessGame.move({
            from: data.idFrom,
            to: data.idTo,
            promotion: "q"
        });
        this.props.setCellsToHighlight([data.idFrom, data.idTo]);
        this.props.setFen(this.chessGame.fen());
        this.props.setWhiteRestOfTime(data.whiteRestOfTime);
        this.props.setBlackRestOfTime(data.blackRestOfTime);

        this.setChessClock();
        let result = this.chessGame.game_over();
        if(result) {
            const opponentColor = this.props.orientation === "b" ? "w" : "b";

            if(this.chessGame.in_checkmate()) {
                this.props.socket.emit("game_over", {
                    result: opponentColor,
                    opponentSocketId: this.props.opponentSocketId
                });
            }

            if(this.chessGame.in_draw()) {
                this.props.socket.emit("game_over", {
                    result: "d",
                    opponentSocketId: this.props.opponentSocketId
                });
            }

        }
    }

    handleMouseDownOnBoard(event) {
        if(!this.isActive) return;
        if(this.props.result) return;
        //if(this.props.orientation !== this.chessGame.turn()) return;

        const piece = this.chessGame.get(event.target.id);
        if(piece) {
            if(this.props.orientation !== piece.color) return;

            this.props.setDraggedPiece({
                left: event.clientX,
                top: event.clientY,
                piece: `${piece.color}${piece.type}`,
                idFrom: event.target.id
            });

            const cellsToHighlight = this.chessGame.moves({
                square: event.target.id,
                verbose: true
            }).map(move => move.to);

            this.props.setCellsToHighlight(cellsToHighlight);
        }
    }

    handleMouseUpOnBoard(event) {
        if(this.props.result) return;
        if(!this.props.draggedPiece) return;

        const idFrom = this.props.draggedPiece.idFrom;
        const idTo = event.target.id;
        const move = this.chessGame.move({
            from: idFrom,
            to: idTo,
            promotion: "q"
        });

        this.props.setDraggedPiece(null);
        this.props.setCellsToHighlight(null);

        if(move) {

            console.log(this.props.whiteRestOfTime);

            this.props.socket.emit("send_move_to_server", {
                idFrom: idFrom,
                idTo: idTo,
                opponentSocketId: this.props.opponentSocketId,
                pgn: this.chessGame.pgn(),
                turn: this.chessGame.turn(),
                whiteRestOfTime: this.props.orientation === "w" ? this.props.whiteRestOfTime + this.incInMs : this.props.whiteRestOfTime,
                blackRestOfTime: this.props.orientation === "b" ? this.props.blackRestOfTime + this.incInMs : this.props.blackRestOfTime,
            });
            this.props.setFen(this.chessGame.fen());

            if(this.props.orientation === "w") {
                this.props.setWhiteRestOfTime(this.props.whiteRestOfTime + this.incInMs);
            } else {
                this.props.setBlackRestOfTime(this.props.blackRestOfTime + this.incInMs);
            }

            this.setChessClock();
        }
    }

    handleMouseLeaveFromBoard(event) {
        if(!this.props.draggedPiece) return;
        this.props.setDraggedPiece(null);
        this.props.setCellsToHighlight(null);
    }

    setChessClock() {
        clearInterval(this.whiteTimer);
        clearInterval(this.blackTimer);

        if(this.chessGame.turn() === "w") {

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
        if(this.chessGame.turn() === "b") {

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
                    draggedPiece = {this.props.draggedPiece}
                    onMouseDown={this.handleMouseDownOnBoard}
                    onMouseUp={this.handleMouseUpOnBoard}
                    onMouseLeave={this.handleMouseLeaveFromBoard}
                    orientation={this.props.orientation}
                />
                {this.props.orientation === "b" &&
                    <div className="clock-container">
                        <div className="clock-container__kostyl">
                            <div className="clock">
                                <ChessTimer className="clock__up" valueInMs={this.props.whiteRestOfTime}/>
                                {this.props.result &&
                                    <div className="clock__middle">
                                        {this.getResultMsg(this.props.result)}
                                    </div>
                                }
                                <ChessTimer className="clock__down" valueInMs={this.props.blackRestOfTime}/>
                            </div>
                        </div>
                    </div>
                }
                {this.props.orientation === "w" &&
                    <div className="clock-container">
                        <div className="clock-container__kostyl">
                            <div className="clock">
                                <ChessTimer className="clock__up" valueInMs={this.props.blackRestOfTime}/>
                                {this.props.result &&
                                    <div className="clock__middle">
                                        {this.getResultMsg(this.props.result)}
                                    </div>
                                }
                                <ChessTimer className="clock__down" valueInMs={this.props.whiteRestOfTime}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default ChessGame_standard;