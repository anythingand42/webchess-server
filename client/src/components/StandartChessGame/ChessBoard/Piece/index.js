import React, {Component} from "react";
import Styles from "./styles.js"

class Piece extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: props.left,
            top: props.top
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
        document.body.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        document.body.removeEventListener("mousemove", this.handleMouseMove);
    }

    render() {
        if(!this.props.piece) {
            throw new Error('attribute "piece" is necessary');
        }
        const Img = Styles[this.props.piece];
        const divStyle = {
            position: "absolute",
            top: this.state.top - this.props.height/2 + "px",
            left: this.state.left - this.props.width/2 + "px",
            width: this.props.width,
            height: this.props.height,
            pointerEvents: "none"
        };
        return (
            <div style={divStyle}>
                <Img/>
            </div>
        )
    }
}

export default Piece;