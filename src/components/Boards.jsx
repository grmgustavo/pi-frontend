import React from "react"
import Board from "./Board"

const Boards = () => {
    return (
        <div className="board-container">
            <Board boardTitle="A fazer" />
            <Board boardTitle="Fazendo" />
            <Board boardTitle="Feito" />
        </div>
    )
}

export default Boards