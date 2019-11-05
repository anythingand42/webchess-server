import React from "react";

class DraggedPiece extends React.PureComponent {
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
        document.body.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        document.body.removeEventListener("mousemove", this.handleMouseMove);
    }

    render() {
        const {pieceImg, height, width} = this.props;
        return (
            <div
                style={{
                    top: this.state.top - height / 2 + "px",
                    left: this.state.left - width / 2 + "px",
                    width: width + "px",
                    height: width + "px",
                    backgroundImage: `url(${pieceImg})`,
                    position: "absolute",
                    pointerEvents: "none",
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            />
        );
    }
}

export default DraggedPiece;