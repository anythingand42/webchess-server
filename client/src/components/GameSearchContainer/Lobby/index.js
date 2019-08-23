import React, {Component} from "react";
import LobbyButton from "./LobbyButton";
import s from "./style.css";

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.socket = props.socket;
        this.socket.on("refresh_lobby", this.refresh);
        this.state = {challenges: []};
    }

    refresh(challenges) {
        this.setState({
            challenges: challenges
        });
    }

    componentWillUnmount() {
        this.socket.removeAllListeners("refresh_lobby");
    }

    render() {
        const challengesList = this.state.challenges.map((challenge) => {
            const text = `${challenge.anonId} ${challenge.options}`;
            return (<LobbyButton key={challenge._id} text={text}/>);
        });
        return (
            <div className={s.lobby}>
                {challengesList}
            </div>
        )
    }
}

export default Lobby;