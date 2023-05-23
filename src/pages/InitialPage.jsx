import { useState } from "react";
import Header from "../components/Header";
import Boards from "../components/Boards";
import Modal from "../components/Modal";

const InitialPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const changeStateFoward = (id, state) => {
        if (state === "A fazer") {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = "Fazendo";
                }
                return task;
            }));
        }
        if (state === "Fazendo") {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = "Feito";
                }
                return task;
            }));
        }
    };

    const changeStateBackwards = (id, state) => {
        if (state === "Fazendo") {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = "A fazer";
                }
                return task;
            }));
        }
        if (state === "Feito") {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    task.state = "Fazendo";
                }
                return task;
            }));
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleCreateTask = () => {
        const newTask = {
            id: tasks.length + 1,
            name: taskName,
            state: "A fazer",
        };
        addTask(newTask);
        closeModal();
    };

    return (
        <div>
            <Header onOpenModal={openModal} />
            <Boards
                tasks={tasks}
                changeStateFoward={changeStateFoward}
                changeStateBackwards={changeStateBackwards}
                deleteTask={deleteTask}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onTaskNameChange={handleTaskNameChange}
                onCreateTask={handleCreateTask}
            />
        </div>
    );
};

export default InitialPage;
