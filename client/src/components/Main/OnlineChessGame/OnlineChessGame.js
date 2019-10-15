import React from "react";
import ChessBoard from "../ChessBoard";
import ChessTimer from "../ChessTimer";
import Chat from "../Chat";
import "./style.css";
import "../../Button/style.css";

class OnlineChessGame extends React.PureComponent {

    componentDidMount() {
        this.props.handleMount();
    }

    componentWillUnmount() {
        this.props.handleUnmount();
    }

    render() {
        let upTimerValue, downTimerValue;
        let upTimerStartDate, downTimerStartDate;
        let upTimerHandleTimeOut, downTimerHandleTimeOut;
        let upUserName, downUserName;
        if(this.props.orientation === "w") {
            upTimerValue = this.props.blackRestOfTime;
            downTimerValue = this.props.whiteRestOfTime;
            upTimerStartDate = this.props.blackTimerStartDate;
            downTimerStartDate = this.props.whiteTimerStartDate;
            upTimerHandleTimeOut = this.props.blackTimerHandleTimeOut;
            downTimerHandleTimeOut = this.props.whiteTimerHandleTimeOut;
            upUserName = this.props.blackUserName || "anonymous";
            downUserName = this.props.whiteUserName || "anonymous";
        } else {
            upTimerValue = this.props.whiteRestOfTime;
            downTimerValue = this.props.blackRestOfTime;
            upTimerStartDate = this.props.whiteTimerStartDate;
            downTimerStartDate = this.props.blackTimerStartDate;
            upTimerHandleTimeOut = this.props.whiteTimerHandleTimeOut;
            downTimerHandleTimeOut = this.props.blackTimerHandleTimeOut;
            upUserName = this.props.whiteUserName || "anonymous";
            downUserName = this.props.blackUserName || "anonymous";
        }
        
        return(
            <section className="game">
                <div className="chat-container">
                    <div className="chat-container__wrapper">
                        <Chat
                            className="chat-container__chat"
                            messages={this.props.chatMessages}
                            handleSubmit={this.props.chatHandleSubmit}
                        />
                    </div>
                </div>
                <ChessBoard
                    fen={this.props.fen}
                    cellsToHighlight={this.props.cellsToHighlight}
                    draggedPiece = {this.props.draggedPiece}
                    onMouseDown={this.props.handleMouseDownOnBoard}
                    onMouseUp={this.props.handleMouseUpOnBoard}
                    onMouseLeave={this.props.handleMouseLeaveFromBoard}
                    orientation={this.props.orientation}
                    className="board"
                />
                {(upTimerValue || upTimerValue === 0) && (downTimerValue || downTimerValue === 0) &&
                    <div className="info-container">
                        <div className="info-container__wrapper">
                            <div className="info">
                                <ChessTimer
                                    className="info__time--up"
                                    valueInMs={upTimerValue}
                                    startRunningDate={upTimerStartDate}
                                    handleTimeOut={upTimerHandleTimeOut}
                                />
                                <div className="info__name--up">
                                    {upUserName}
                                </div>
                                {this.props.result ?
                                    <div className="info__result">
                                        <p>{this.props.resultReason}</p>
                                        <p>{this.props.result}</p>
                                    </div>
                                    :
                                    <button className="button_gray info__resign-button" onClick={this.props.handleResign}>resign</button>
                                }
                                <div className="info__name--down">
                                    {downUserName}
                                </div>
                                <ChessTimer
                                    className="info__time--down"
                                    valueInMs={downTimerValue}
                                    startRunningDate={downTimerStartDate}
                                    handleTimeOut={downTimerHandleTimeOut}
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