import React from "react";
import "./style.scss";

class Cell extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseDown(event) {
        event.preventDefault();
        const id = event.target.id;
        const {clientX, clientY} = event;
        this.props.onMouseDown({id, clientY, clientX});
    }

    onMouseUp(event) {
        event.preventDefault();
        const id = event.target.id;
        this.props.onMouseUp(id);
    }

    render() {
        const {
            pieceImg,
            isPieceTransparent = false,
            isHighlighted = false,
            color = "w",
            id
        } = this.props;
        let imgClasses = pieceImg ? "piece" : "";
        if(isPieceTransparent) imgClasses += " transparent";
        let cellClasses = `cell ${color}`;
        if(isHighlighted) cellClasses += " highlight";
        return (
            <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className={cellClasses} id={id}>
                {pieceImg && <img className={imgClasses} src={pieceImg} alt=""/>}
            </div>
        );
    }
}

export default Cell;