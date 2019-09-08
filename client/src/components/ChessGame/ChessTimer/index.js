import React, {Component} from "react";

class ChessTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formattedValue: {}
        };
        this.valueInMs = props.value;
        this.isRunning = props.isRunning;
        this.timer = null;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        this.setState({
            formattedValue: this.formatValue(this.valueInMs)
        });
        if(this.isRunning) {
            this.startTimer();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.valueInMs = nextProps.value;
        this.setState({
            formattedValue: this.formatValue(this.valueInMs)
        });
        if(this.isRunning) {
            this.startTimer();
        }
    }

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

    startTimer() {
        if (this.timer === null && this.valueInMs > 0) {
            this.timer = setInterval(this.countDown, 100);
        }
    }

    pauseTimer() {
        clearInterval(this.timer);
    }

    countDown() {
        this.valueInMs = this.valueInMs - 100;
        this.setState({
            formattedValue: this.formatValue(this.valueInMs)
        });

        if (this.valueInMs <= 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        return(
            <div>
                {this.state.formattedValue.m}:{this.state.formattedValue.s}.{this.state.formattedValue.ds}
            </div>
        );
    }
}

export default ChessTimer;