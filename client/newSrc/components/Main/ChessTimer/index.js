import React from "react";

class ChessTimer extends React.PureComponent {

    formatValue(ms) {
        let hours = Math.floor(ms / (60 * 60 * 1000));

        let minutes = Math.floor( ms / (60 * 1000) );
        minutes =  minutes % 60;
        if(minutes < 10) {
            minutes = `0${minutes}`;
        }

        let seconds = Math.floor( ms / 1000 );
        seconds =  seconds % 60;
        if(seconds < 10) {
            seconds = `0${seconds}`;
        }

        let deciseconds = Math.floor( ms / 100 );
        deciseconds = deciseconds % 10;

        return {
            "h": hours,
            "m": minutes,
            "s": seconds,
            "ds": deciseconds
        };
    }

    render() {
        const formattedValue = this.formatValue(this.props.valueInMs);
        return(
            <div>
                {formattedValue.m}:{formattedValue.s}.{formattedValue.ds}
            </div>
        );
    }
}

export default ChessTimer;