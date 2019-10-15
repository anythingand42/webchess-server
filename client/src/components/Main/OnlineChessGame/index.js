import React from "react";
import { connect } from "react-redux";
import OnlineChessGame from "./OnlineChessGame.js";
import {
    handleMount,
    handleMouseDownOnBoard,
    handleMouseUpOnBoard,
    handleMouseLeaveFromBoard,
    whiteTimerHandleTimeOut,
    blackTimerHandleTimeOut,
    handleUnmount,
    chatHandleSubmit,
    handleResign
} from "../../../store/OnlineChessGame/sagaActions";

class ConnectedOnlineChessGame extends React.Component {
    render() {
        return(
            <OnlineChessGame
                isActive={this.props.isActive}
                fen={this.props.fen}
                pgn={this.props.pgn}
                orientation={this.props.orientation}
                draggedPiece={this.props.draggedPiece}
                cellsToHighlight={this.props.cellsToHighlight}
                whiteUserName={this.props.whiteUserName}
                blackUserName={this.props.blackUserName}
                whiteRestOfTime={this.props.whiteRestOfTime}
                blackRestOfTime={this.props.blackRestOfTime}
                whiteTimerStartDate={this.props.whiteTimerStartDate}
                blackTimerStartDate={this.props.blackTimerStartDate}
                result={this.props.result}
                resultReason={this.props.resultReason}
                chatMessages={this.props.chatMessages}
                handleMount={this.props.handleMount}
                handleMouseDownOnBoard={this.props.handleMouseDownOnBoard}
                handleMouseUpOnBoard={this.props.handleMouseUpOnBoard}
                handleMouseLeaveFromBoard={this.props.handleMouseLeaveFromBoard}
                whiteTimerHandleTimeOut={this.props.whiteTimerHandleTimeOut}
                blackTimerHandleTimeOut={this.props.blackTimerHandleTimeOut}
                handleUnmount={this.props.handleUnmount}
                chatHandleSubmit={this.props.chatHandleSubmit}
                handleResign={this.props.handleResign}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        draggedPiece: state.onlineChessGame.draggedPiece,
        cellsToHighlight: state.onlineChessGame.cellsToHighlight,
        isActive: state.onlineChessGame.isActive,
        fen: state.onlineChessGame.fen,
        pgn: state.onlineChessGame.pgn,
        orientation: state.onlineChessGame.orientation,
        whiteUserName: state.onlineChessGame.whiteUserName,
        blackUserName: state.onlineChessGame.blackUserName,
        whiteRestOfTime: state.onlineChessGame.whiteRestOfTime,
        blackRestOfTime: state.onlineChessGame.blackRestOfTime,
        whiteTimerStartDate: state.onlineChessGame.whiteTimerStartDate,
        blackTimerStartDate: state.onlineChessGame.blackTimerStartDate,
        result: state.onlineChessGame.result,
        resultReason: state.onlineChessGame.resultReason,
        chatMessages: state.onlineChessGame.chatMessages
    }
};

const mapDispatchToProps = {
    handleMount,
    handleMouseDownOnBoard,
    handleMouseUpOnBoard,
    handleMouseLeaveFromBoard,
    whiteTimerHandleTimeOut,
    blackTimerHandleTimeOut,
    handleUnmount,
    chatHandleSubmit,
    handleResign
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectedOnlineChessGame);