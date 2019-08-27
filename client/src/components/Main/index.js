import React, {Component} from "react";
import GameSearchContainer from "../GameSearchContainer";
import Header from "../Header";
import MessageForm from "../MessageForm";
import Textarea from "../Textarea";
import Container from  "./styles.js"
import io from "socket.io-client/dist/socket.io";
import setCookie from "set-cookie";
import ChessBoard from "../ChessBoard";

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {game: false};
        this.socket = io();
        this.socket.on("anon_cookie", (token) => {
            setCookie('webchessAnon', token, { maxAge: 10000 });
        });
        this.socket.on("start_game", () => {
            this.setState({game:true});
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
                <div>
                    <ChessBoard/>
                    <Textarea socket={this.socket} />
                    <MessageForm socket={this.socket} />
                </div>
            )
        } else {
            cont = <GameSearchContainer socket={this.socket} />;
        }

        return (
                <Container>
                    <Header />
                    {cont}
                </Container>
        )
    }
}

export default Main;