import React from "react";
import "./style.css";

class Lobby extends React.Component {
    render() {
        let challengesList = [];
        if(this.props.challenges) {
            challengesList = this.props.challenges.map((challenge) => {
                let name, rating, time, mode;
                if (!challenge.player) {
                    name = "anonymous";
                    rating = "-";
                    time = challenge.time;
                    mode = challenge.mode;
                } else {
                    name = challenge.player.name;
                    rating = challenge.player.rating;
                    time = challenge.options.time;
                    mode = challenge.options.mode;
                }
                return (
                    <div key={challenge._id} className="lobby__line">
                        <div>{name}</div>
                        <div>{rating}</div>
                        <div>{time}</div>
                        <div>{mode}</div>
                    </div>
                );
            });
        }
        return (
            <div className="lobby search-opponent-container__lobby">
                <div className="lobby__header">
                        <div>player</div>
                        <div>rating</div>
                        <div>time</div>
                        <div>mode</div>
                </div>
                <div className="lobby__table">
                    {challengesList}
                </div>
            </div>
        );
    }
}

export default Lobby;