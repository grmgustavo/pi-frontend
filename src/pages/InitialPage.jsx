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

    ])

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const changeStateFoward = (id, state) => {
        if (state === 'A fazer') {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = 'Fazendo'
                }
                return task
            }))
        }
        if (state === 'Fazendo') {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = 'Feito'
                }
                return task
            }))
        }
    }

    const changeStateBackwards = (id, state) => {
        if (state === 'Fazendo') {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = 'A fazer'
                }
                return task
            }))
        }
        if (state === 'Feito') {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = 'Fazendo'
                }
                return task
            }))
        }
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <div>
            <Header tasks={tasks} onOpenModal={handleOpenModal} />
            <Boards tasks={tasks} changeStateFoward={changeStateFoward} changeStateBackwards={changeStateBackwards} deleteTask={deleteTask} />
            <Modal isOpen={isOpen}>
                <div className="new-task-form">
                    <p className="new-task-title">{'Nova Tarefa'}</p>
                    <input type="text" className="input-new-task" placeholder="Nome da nova tarefa" onChange={(text) => {
                        setTaskName(text.target.value)
                    }} />
                    <div className="new-task-buttons-container">
                        <button className="new-task-buttons" onClick={handleOpenModal}>Cancelar</button>
                        <button className="new-task-buttons" onClick={() => {
                            addTask({ id: tasks.length + 1, name: taskName, state: "A fazer" })
                            handleOpenModal()
                        }}>Criar</button>
                    </div>
                </div >
            </Modal>
        </div>
    );
}

export default InitialPage