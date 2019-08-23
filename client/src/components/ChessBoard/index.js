import ChessGame from "chess.js";
import React, {Component} from "react";
import Cell from "./Cell";
import s from "./style.css";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Cell cssClasses={[s.cell, s.light]}/>
                <Cell cssClasses={[s.cell, s.dark]}/>
            </div>
        )
    }
}

export default ChessBoard;