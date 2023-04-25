import React from "react";

const Task = (props) => {
    return (
        <div className="task">
            <div className="task-name">{props.taskName}</div>
        </div>
    )
}

export default Task