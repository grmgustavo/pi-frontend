import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getFirestore, addDoc, doc, collection, getDocs, /*updateDoc,*/ deleteDoc } from "firebase/firestore";
import Header from "../components/Header";
import Modal from "../components/Modal";

import app from "../config/firebase";
const db = getFirestore(app);

const Home = () => {
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

    const tasksList = ({ tasks, boardTitle, deleteTask }) => {
        // eslint-disable-next-line react/prop-types
        return tasks?.map((task) => {
            return task.state === boardTitle ? (
                <li key={task.id} className="task">

                    <h1 className="task-name">{task.name}</h1>

                    <button onClick={() => deleteTask(task.id)} className="task-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </button>
                </li>
            ) : (
                ''
            )
        }) || ''
    }

    // const handleTaskStateChange = async (id, state) => {
    //     console.log(id, state);
    //     console.log('funcionou');
    //     if (state === "A fazer") {
    //         await updateDoc(doc(db, "tasks", id), {
    //             state: "Fazendo",
    //         }).then(() => {
    //             window.location.reload();
    //         }
    //         );
    //     }
    //     if (state === "Fazendo") {
    //         await updateDoc(doc(db, "tasks", id), {
    //             state: "Feito",
    //         }).then(() => {
    //             window.location.reload();
    //         });
    //     }
    //     if (state === "Feito") {
    //         await updateDoc(doc(db, "tasks", id), {
    //             state: "A fazer",
    //         }).then(() => {
    //             window.location.reload();
    //         });
    //     }
    // }

    const boardTitles = ['A fazer', 'Fazendo', 'Feito']

    return (
        <DndProvider backend={HTML5Backend} >
            <div>
                <Header onOpenModal={openModal} />
                <div className="board-container">
                    <div className="boards">
                        <div className="board-title">{boardTitles[0]}</div>
                        <div className="board-content">
                            <div className="tasks">
                                {tasksList({ tasks, boardTitle: boardTitles[0], deleteTask })}
                            </div>
                        </div>
                    </div>
                    <div className="boards">
                        <div className="board-title">{boardTitles[1]}</div>
                        <div className="board-content">
                            <div className="tasks">
                                {tasksList({ tasks, boardTitle: boardTitles[1], deleteTask })}
                            </div>
                        </div>
                    </div>
                    <div className="boards">
                        <div className="board-title">{boardTitles[2]}</div>
                        <div className="board-content">
                            <div className="tasks">
                                {tasksList({ tasks, boardTitle: boardTitles[2], deleteTask })}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onTaskNameChange={handleTaskNameChange}
                    onCreateTask={handleCreateTask}
                />
            </div>
        </DndProvider>
    );
};

export default Home;
