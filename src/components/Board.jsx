import React from "react";
import Task from "./Task"

const Board = ({ boardTitle, tasks, changeState }) => {
    return (
        <div className="boards">
            <div className="board-title">{boardTitle}</div>
            <div className="board-content">
                <Task boardTitle={boardTitle} tasks={tasks} changeState={changeState} />

            </div>
        </div>
    )
}

export default Board