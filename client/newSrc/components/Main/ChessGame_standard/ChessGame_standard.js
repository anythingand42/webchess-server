import React from "react";
import ChessBoard from "../ChessBoard";
import ChessTimer from "../ChessTimer";
import Chat from "../Chat";
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
        this.state = {
            whiteTime: 0,
            blackTime: 0,
            whiteUserName: null,
            blackUserName: null,
        }
        this.whiteTimer = null;
        this.blackTimer = null;
        this.whiteRestOfTime = null;
        this.blackRestOfTime = null;
        this.startClockFlag = false;
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
        this.blurDate = null;
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

        if(options.game) {
            this.props.setOrientation(options.game.orientation);
            this.whiteRestOfTime = options.game.whiteRestOfTime;
            this.blackRestOfTime = options.game.blackRestOfTime;
            this.incInMs = options.game.incInMs;
            this.props.setPgn(options.game.pgn);
            this.chessGame.load_pgn(options.game.pgn);
            this.props.setFen(this.chessGame.fen());
            this.isActive = true;
            this.setChessClock(options.game.lastUpdateDate);
            this.setState({
                whiteUserName: options.game.whiteUserName ? options.game.whiteUserName : "anonymous",
                blackUserName: options.game.blackUserName ? options.game.blackUserName : "anonymous"
            });
        }
    }

    setChessClock(startDate) {
        clearInterval(this.whiteTimer);
        clearInterval(this.blackTimer);

        if(!this.startClockFlag) {
            const splittedFen = this.chessGame.fen().split(" ");
            const numberOfMove = Number(splittedFen[splittedFen.length - 1]);
            if(numberOfMove > 1) this.startClockFlag = true;
        }

        if(this.chessGame.turn() === "w") {

            this.setState({
                whiteTime: startDate && this.startClockFlag ? this.whiteRestOfTime - (new Date().getTime() - startDate) : this.whiteRestOfTime,
                blackTime: this.blackRestOfTime
            });

            if(!this.startClockFlag) return;

            if(!startDate) startDate = new Date().getTime();

            this.whiteTimer = setInterval(() => {
                const time = this.whiteRestOfTime - (new Date().getTime() - startDate);
            
                if(time <= 0 && this.props.orientation === "w") {
                    this.props.socket.emit("game_over", {
                        result: "b",
                        opponentSocketId: this.props.opponentSocketId
                    });
                    clearInterval(this.whiteTimer);
                }

                this.setState({
                    whiteTime: time
                });

            }, 100);
        } else {

            this.setState({
                whiteTime: this.whiteRestOfTime,
                blackTime: startDate && this.startClockFlag ? this.blackRestOfTime - (new Date().getTime() - startDate) : this.blackRestOfTime,
            });

            if(!this.startClockFlag) return;

            if(!startDate) startDate = new Date().getTime();

            this.blackTimer = setInterval(() => {
                const time = this.blackRestOfTime - (new Date().getTime() - startDate);

                if(time <= 0 && this.props.orientation === "b") {
                    this.props.socket.emit("game_over", {
                        result: "w",
                        opponentSocketId: this.props.opponentSocketId
                    });
                    clearInterval(this.blackTimer);
                }

                this.setState({
                    blackTime: time
                });
            }, 100);
        }
    }

    handleSendMoveToClient(data) {
        this.chessGame.move({
            from: data.idFrom,
            to: data.idTo,
            promotion: "q"
        });

        this.props.setCellsToHighlight([data.idFrom, data.idTo]);
        this.props.setFen(this.chessGame.fen());
        this.whiteRestOfTime = data.whiteRestOfTime;
        this.blackRestOfTime = data.blackRestOfTime;

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

        this.setChessClock();
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

            clearInterval(this.whiteTimer);
            clearInterval(this.blackTimer);

            this.props.socket.emit("send_move_to_server", {
                idFrom: idFrom,
                idTo: idTo,
                opponentSocketId: this.props.opponentSocketId,
                pgn: this.chessGame.pgn(),
                turn: this.chessGame.turn(),
                whiteRestOfTime: this.props.orientation === "w" && this.startClockFlag ? this.state.whiteTime + this.incInMs : this.state.whiteTime,
                blackRestOfTime: this.props.orientation === "b" && this.startClockFlag ? this.state.blackTime + this.incInMs : this.state.blackTime,
            });
            this.props.setFen(this.chessGame.fen());

            if(this.props.orientation === "w") {
                this.whiteRestOfTime = this.startClockFlag ? this.state.whiteTime + this.incInMs : this.state.whiteTime;
            } else {
                this.blackRestOfTime = this.startClockFlag ? this.state.blackTime + this.incInMs : this.state.blackTime;
            }

            this.setChessClock();
        }
    }

    handleMouseLeaveFromBoard(event) {
        if(!this.props.draggedPiece) return;
        this.props.setDraggedPiece(null);
        this.props.setCellsToHighlight(null);
    }

    getResultMsg(result) {
        if(result === "w") return "white won";
        if(result === "b") return "black won";
        if(result === "d") return "draw";
    }

    render() {
        return(
            <section className="game">
                <div className="chat-container">
                    <div className="chat-container__wrapper">
                        <Chat
                            className="chat-container__chat"
                            opponentSocketId={this.props.opponentSocketId}
                            userName={this.props.orientation === "w" ? this.state.whiteUserName : this.state.blackUserName}
                            socket={this.props.socket}
                        />
                    </div>
                </div>
                <ChessBoard
                    fen={this.props.fen}
                    cellsToHighlight={this.props.cellsToHighlight}
                    draggedPiece = {this.props.draggedPiece}
                    onMouseDown={this.handleMouseDownOnBoard}
                    onMouseUp={this.handleMouseUpOnBoard}
                    onMouseLeave={this.handleMouseLeaveFromBoard}
                    orientation={this.props.orientation}
                    className="board"
                />
                <div className="info-container">
                    <div className="info-container__wrapper">
                        <div className="info">
                            <ChessTimer
                                className="info__time--up"
                                valueInMs={this.props.orientation === "b" ? this.state.whiteTime : this.state.blackTime}
                            />
                            <div className="info__name--up">
                                {this.props.orientation === "b" ? this.state.whiteUserName : this.state.blackUserName}
                            </div>
                            {this.props.result &&
                                <div className="info__result">
                                    {this.getResultMsg(this.props.result)}
                                </div>
                            }
                            <div className="info__name--down">
                                {this.props.orientation === "w" ? this.state.whiteUserName : this.state.blackUserName}
                            </div>
                            <ChessTimer
                                className="info__time--down"
                                valueInMs={this.props.orientation === "b" ? this.state.blackTime : this.state.whiteTime}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default ChessGame_standard;