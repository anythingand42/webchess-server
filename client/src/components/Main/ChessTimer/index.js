import React from "react";

class ChessTimer extends React.Component {
    constructor(props) {
        super(props);
        // this.timer = null;
        // this.state = {
        //     valueInMs: this.props.valueInMs
        // };
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         valueInMs: nextProps.valueInMs
    //     });
    // }

    formatValue(ms) {
        if(ms <= 0) {
            ms = 0;
        }

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
        // const startDate = this.props.startDate;
        // if(startDate) {
        //     this.timer = setTimeout(() => {
        //         this.setState({
        //             valueInMs: this.props.valueInMs - (new Date().getTime() - startDate)
        //         });
        //     }, 100);
        // };
        const formattedValue = this.formatValue(this.props.valueInMs);
        return(
            <div className={this.props.className}>
                {formattedValue.m}:{formattedValue.s}.{formattedValue.ds}
            </div>
        );
    }
}

export default ChessTimer;