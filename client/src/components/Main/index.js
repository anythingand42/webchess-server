import React, {Component} from "react";
import GameSearchContainer from "../GameSearchContainer";
import Header from "../Header";
import Styles from  "./styles.js"
import io from "socket.io-client/dist/socket.io";
import setCookie from "set-cookie";
import ChessGame from "../ChessGame";
import ChessTimer from "../ChessGame/ChessTimer";
import StandartChessGame from "../StandartChessGame";

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            game: false,
            color: null,
            restOfTime: null,
            inc: null
        };
        this.socket = io();
        this.socket.on("anon_cookie", (token) => {
            setCookie('webchessAnon', token, { maxAge: 10000 });
        });
        this.socket.on("start_game", (gameOptions) => {
            this.setState({
                game: true,
                color: gameOptions.color,
                restOfTime: gameOptions.restOfTime,
                inc: gameOptions.inc
            });
        });
    }

    componentWillUnmount() {
        this.socket.removeAllListeners("anon_cookie");
        this.socket.removeAllListeners("start_game");
    }

    render() {
        let cont;
        if(this.state.game) {
            cont = (
                <ChessGame
                    socket={this.socket}
                    color={this.state.color}
                    restOfTime={this.state.restOfTime}
                    inc={this.state.inc}
                />
            )
        } else {
            cont = <GameSearchContainer socket={this.socket}/>;
        }

        return (
                <Styles.Container>
                    <Header />
                    {cont}
                </Styles.Container>
        )
    }
}
//
// function Main() {
//     return(
//         <StandartChessGame/>
//     )
// }

export default Main;