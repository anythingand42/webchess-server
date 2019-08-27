import React, {Component} from "react";
import Styles from "./styles.js"

class Piece extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: props.left,
            top: props.top
        };
        this.piece = props.piece;
        this.width = props.width;
        this.height = props.height;
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
        if(!this.piece) {
            throw new Error('attribute "piece" is necessary');
        }
        const Img = Styles[this.piece];
        const divStyle = {
            position: "absolute",
            top: this.state.top - this.height/2 + "px",
            left: this.state.left - this.width/2 + "px",
            width: this.width,
            height: this.height,
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