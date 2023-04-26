import React from "react"
import Board from "./Board"

const Boards = ({ tasks, changeState }) => {
    return (
        <div className="board-container">
            <Board boardTitle="A fazer" tasks={tasks} changeState={changeState} />
            <Board boardTitle="Fazendo" tasks={tasks} changeState={changeState} />
            <Board boardTitle="Feito" tasks={tasks} changeState={changeState} />
        </div>
    )
}

export default Boards