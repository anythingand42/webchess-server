import React, {Component} from "react";
import GameSearchContainer from "../GameSearchContainer";
import Header from "../Header";
import Styles from  "./styles.js"
import io from "socket.io-client/dist/socket.io";
import setCookie from "set-cookie";
import ChessBoard from "../ChessBoard";
import Chat from "../Chat";

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {game: false, color: null};
        this.socket = io();
        this.socket.on("anon_cookie", (token) => {
            setCookie('webchessAnon', token, { maxAge: 10000 });
        });
        this.socket.on("start_game", (color) => {
            this.setState({game: true, color: color});
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
                <Styles.ContentDiv>
                    <Styles.ChatDiv>
                        <Chat socket={this.socket}/>
                    </Styles.ChatDiv>
                    <Styles.BoardDiv>
                        <ChessBoard socket = {this.socket} color = {this.state.color}/>
                    </Styles.BoardDiv>
                </Styles.ContentDiv>
            )
        } else {
            cont = <GameSearchContainer socket={this.socket} />;
        }

        return (
                <Styles.Container>
                    <Header />
                    {cont}
                </Styles.Container>
        )
    }
}

export default Main;