import React from "react";
import "./style.css";

function Lobby(props) {
    let challengesList = [];
    if(props.challenges) {
        challengesList = props.challenges.map((challenge) => {
            let name, rating, time, mode;
            if (!challenge.challengerName) {
                name = "anonymous";
                rating = "-";
                time = challenge.time;
                mode = challenge.mode;
            } else {
                name = challenge.challengerName;
                rating = "-";
                time = challenge.time;
                mode = challenge.mode;
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

export default Lobby;