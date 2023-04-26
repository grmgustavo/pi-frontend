import React, { useState } from "react";
import Header from "../components/Header";
import Boards from "../components/Boards";
import Modal from "../components/Modal";

const InitialPage = () => {

    const [taskName, setTaskName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false)
    }
    let [tasks, setTasks] = useState([
        {
            id: 1,
            name: "A task",
            state: "A fazer"
        }, {
            id: 2,
            name: "Another task",
            state: "Fazendo"
        },
        {
            id: 4,
            name: "Another task",
            state: "Fazendo"
        },
        {
            id: 3,
            name: "A task",
            state: "Feito"
        }
    ])

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
        console.log(tasks)
    };

    const changeState = (id, state) => {
        let newTasks = tasks.map((task) => {
            if (task.id === id) {
                task.state = state;
            }
            return task;
        });
        setTasks(newTasks);
    }

    return (
        <div>
            <Header tasks={tasks} onOpenModal={handleOpenModal} />
            <Boards tasks={tasks} changeState={changeState} />
            <Modal isOpen={isOpen}>
                <div className="new-task-form">
                    <p className="new-task-title">{'Nova Tarefa'}</p>
                    <input type="text" className="input-new-task" placeholder="Nome da nova tarefa" onChange={(text) => {
                        setTaskName(text.target.value)
                        console.log(taskName)
                    }} />
                    <div className="new-task-buttons-container">
                        <button className="new-task-buttons" onClick={handleOpenModal}>Cancelar</button>
                        <button className="new-task-buttons" onClick={() => {
                            addTask({ id: tasks.length + 1, name: taskName, state: "A fazer" })
                        }}>Criar</button>
                    </div>
                </div >
            </Modal>
        </div>
    );
}

export default InitialPage