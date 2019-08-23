import React, {Component} from "react";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.cssClasses = props.cssClasses.join(" ");
    }

    render() {
        return (
            <div className={`${this.cssClasses}`}/>
        )
    }
}

export default Cell;