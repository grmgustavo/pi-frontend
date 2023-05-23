import Task from "./Task"

const Board = ({ boardTitle, tasks, changeStateFoward, changeStateBackwards, deleteTask }) => {
    return (
        <div className="boards">
            <div className="board-title">{boardTitle}</div>
            <div className="board-content">
                <Task boardTitle={boardTitle} tasks={tasks} changeStateFoward={changeStateFoward} changeStateBackwards={changeStateBackwards} deleteTask={deleteTask} />
            </div>
        </div>
    )
}

export default Board