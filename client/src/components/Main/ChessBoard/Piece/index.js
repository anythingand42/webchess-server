import React from "react";
import "./style.css";

class Piece extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            top: props.top,
            left: props.left
        };
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove(event) {
        this.setState({
            top: event.clientY,
            left: event.clientX
        });
    }

    componentDidMount() {
        document.body.removeEventListener("mousemove", this.handleMouseMove);
        document.body.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        document.body.removeEventListener("mousemove", this.handleMouseMove);
    }

    render() {
        return (
            <div
                className={`piece-div piece-div__${this.props.piece}`}
                style={{
                    top: this.state.top - this.props.height / 2 + "px",
                    left: this.state.left - this.props.width / 2 + "px",
                    width: this.props.width + "px",
                    height: this.props.width + "px"
                }}
            />
        );
    }
}

export default Piece;