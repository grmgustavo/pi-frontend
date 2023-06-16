import Board from "./Board"

// eslint-disable-next-line react/prop-types
const Boards = ({ tasks, changeStateFoward, changeStateBackwards, deleteTask }) => {
    return (
        <div className="board-container">
            <Board boardTitle="A fazer" tasks={tasks} changeStateFoward={changeStateFoward} changeStateBackwards={changeStateBackwards} deleteTask={deleteTask} />
            <Board boardTitle="Fazendo" tasks={tasks} changeStateFoward={changeStateFoward} changeStateBackwards={changeStateBackwards} deleteTask={deleteTask} />
            <Board boardTitle="Feito" tasks={tasks} changeStateFoward={changeStateFoward} changeStateBackwards={changeStateBackwards} deleteTask={deleteTask} />
        </div>
    )
}

export default Boards