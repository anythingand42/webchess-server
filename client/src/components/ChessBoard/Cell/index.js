import React, {Component} from "react";
import Styles from "./styles.js";

class Cell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.piece === null || this.props.piece === undefined) {
            if(this.props.highlight) {
                return (
                    <Styles.EmptyCell id={this.props.id}>
                        <Styles.highlighter/>
                    </Styles.EmptyCell>
                );
            } else {
                return <Styles.EmptyCell id={this.props.id}/>;
            }
        } else {
            const CellWithPiece = Styles[this.props.piece];
            if(this.props.highlight) {
                return (
                    <CellWithPiece id={this.props.id}>
                        <Styles.highlighter/>
                    </CellWithPiece>
                );
            }

            return (
                <CellWithPiece id={this.props.id}/>
            );
        }
    }
}

export default Cell;