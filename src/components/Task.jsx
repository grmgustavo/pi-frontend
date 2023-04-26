import React from "react";



const tasksList = ({ tasks, boardTitle, changeState }) => {
    return tasks?.map((task) => {
        return task.state === boardTitle ? (
            <li key={task.id} className="task">
                {task.state !== 'A fazer' ? <button className="task-button">{'←'}</button> : <p></p>}
                <h1 className="task-name">{task.name}</h1>
                {task.state !== 'Feito' ? <button className="task-button">{'→'}</button> : <p></p>}
            </li>
        ) : (
            ''
        )
    }) || ''
}

const Task = ({ tasks,
    boardTitle, changeState }) => {
    return (
        <div className="tasks">
            {tasksList({ tasks, boardTitle, changeState })}
        </div>
    )

}
export default Task