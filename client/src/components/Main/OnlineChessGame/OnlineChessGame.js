import React from "react";
import ChessBoard from "../ChessBoard";
import ChessTimer from "../ChessTimer";
import Chat from "../Chat";
import "./style.css";

class OnlineChessGame extends React.PureComponent {

    componentDidMount() {
        this.props.fetchInitialState();
    }

    componentWillUnmount() {
        this.props.handleUnmount();
    }

    render() {
        let upTimerValue, downTimerValue;
        let upTimerStartDate, downTimerStartDate;
        if(this.props.orientation === "w") {
            upTimerValue = this.props.blackRestOfTime;
            downTimerValue = this.props.whiteRestOfTime;
            upTimerStartDate = this.props.blackTimerStartDate;
            downTimerStartDate = this.props.whiteTimerStartDate;
        } else {
            upTimerValue = this.props.whiteRestOfTime;
            downTimerValue = this.props.blackRestOfTime;
            upTimerStartDate = this.props.whiteTimerStartDate;
            downTimerStartDate = this.props.blackTimerStartDate;
        }
        
        return(
            <section className="game">
                <div className="chat-container">
                    {/* <div className="chat-container__wrapper">
                        <Chat
                            className="chat-container__chat"
                            opponentSocketId={this.props.opponentSocketId}
                            userName={this.props.orientation === "w" ? this.state.whiteUserName : this.state.blackUserName}
                            socket={this.props.socket}
                        />
                    </div> */}
                </div>
                <ChessBoard
                    fen={this.props.fen}
                    cellsToHighlight={this.props.cellsToHighlight}
                    draggedPiece = {this.props.draggedPiece}
                    onMouseDown={this.props.handleMouseDownOnBoard}
                    onMouseUp={this.props.handleMouseUpOnBoard}
                    onMouseLeave={this.handleMouseLeaveFromBoard}
                    orientation={this.props.orientation}
                    className="board"
                />
                {upTimerValue && downTimerValue &&
                    <div className="info-container">
                        <div className="info-container__wrapper">
                            <div className="info">
                                <ChessTimer
                                    className="info__time--up"
                                    valueInMs={upTimerValue}
                                    startRunningDate={upTimerStartDate}
                                />
                                <div className="info__name--up">
                                    {this.props.orientation === "b" ? this.props.whiteUserName : this.props.blackUserName}
                                </div>
                                {this.props.result &&
                                    <div className="info__result">
                                        {this.props.result}
                                    </div>
                                }
                                <div className="info__name--down">
                                    {this.props.orientation === "w" ? this.props.whiteUserName : this.props.blackUserName}
                                </div>
                                <ChessTimer
                                    className="info__time--down"
                                    valueInMs={downTimerValue}
                                    startRunningDate={downTimerStartDate}
                                />
                            </div>
                        </div>
                    </div>
                }
            </section>
        );
    }

}

export default OnlineChessGame;