import React from "react";
import Task from "./Task"

const Board = (props) => {
    return (
        <div className="boards">
            <div className="boards-title">{props.boardTitle}</div>
            <div className="boards-content">
                <Task taskName="A"/>
          
            </div>
        </div>
    )
}

export default Board