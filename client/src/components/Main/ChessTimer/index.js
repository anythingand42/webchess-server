import React from "react";

class ChessTimer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            valueInMs: props.valueInMs
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.startRunningDate && !this.props.startRunningDate) {
            this.timer = setInterval(() => {
                const delta = new Date().getTime() - this.props.startRunningDate;
                const newValue = this.props.valueInMs - delta;

                this.setState({
                    valueInMs: newValue
                });

                if(newValue <= 0) clearInterval(this.timer);
            }, 100);
        }
        if(!nextProps.startRunningDate) {
            clearInterval(this.timer);
            this.setState({
                valueInMs: nextProps.valueInMs
            });
        }
    }

    componentDidMount() {
        if(this.props.startRunningDate) {
            this.timer = setInterval(() => {
                const delta = new Date().getTime() - this.props.startRunningDate;
                const newValue = this.props.valueInMs - delta;

                this.setState({
                    valueInMs: newValue
                });

                if(newValue <= 0) clearInterval(this.timer);
            }, 100);
        }
    }

    formatValue(ms) {
        if(ms <= 0 || !ms) {
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

        const formattedValue = this.formatValue(this.state.valueInMs);
        return(
            <div className={this.props.className}>
                {formattedValue.m}:{formattedValue.s}.{formattedValue.ds}
            </div>
        );
    }
}

export default ChessTimer;