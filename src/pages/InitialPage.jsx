import { useEffect, useState } from "react";
import Header from "../components/Header";
import Boards from "../components/Boards";
import Modal from "../components/Modal";

import app from "../config/firebase";

import { getFirestore, addDoc, doc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

const InitialPage = () => {

    const getTasks = async () => {
        const tasks = await getDocs(collection(db, "tasks"));
        return tasks
    }

    useEffect(() => {
        getTasks().then((tasks) => {
            const tasksArray = [];
            tasks.forEach((doc) => {
                if (doc.data().user === JSON.parse(localStorage.getItem("user")).uid) {
                    tasksArray.push({ ...doc.data(), id: doc.id });
                }
            });
            setTasks(tasksArray);
        });
    }, []);

    const [tasks, setTasks] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addTask = async (newTask) => {
        console.log(newTask);

        try {
            await addDoc(collection(db, "tasks"), newTask)
                .then(() => {
                    window.location.reload();
                });
        } catch (error) {
            console.error(error);
            alert("Erro ao adicionar tarefa", error);
        }
    };

    const changeStateFoward = async (id, state) => {
        if (state === "A fazer") {
            await updateDoc(doc(db, "tasks", id), {
                state: "Fazendo",
            }).then(() => {
                window.location.reload();
            });
        }
        if (state === "Fazendo") {
            await updateDoc(doc(db, "tasks", id), {
                state: "Feito",
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const changeStateBackwards = async (id, state) => {
        if (state === "Fazendo") {
            await updateDoc(doc(db, "tasks", id), {
                state: "A fazer",
            }).then(() => {
                window.location.reload();
            });
        }
        if (state === "Feito") {
            await updateDoc(doc(db, "tasks", id), {
                state: "Fazendo",
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "tasks", id)).then(() => {
            window.location.reload();
        });
    };

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleCreateTask = () => {
        const newTask = {
            id: tasks.length + 1,
            name: taskName,
            state: "A fazer",
            user: JSON.parse(localStorage.getItem("user")).uid
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
