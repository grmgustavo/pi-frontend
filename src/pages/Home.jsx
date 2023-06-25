import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getFirestore, addDoc, doc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import Header from "../components/Header";
import Modal from "../components/Modal";

import app from "../config/firebase";
const db = getFirestore(app);

const Home = () => {
    const boardTitles = ['A fazer', 'Fazendo', 'Feito']
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addTask = async (newTask) => {
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

    const updateTaskState = async (id, state) => {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            state: state,
        }).then(() => {
            window.location.reload();
        });
    };

    const updateTaskName = async (id) => {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            name: taskName,
        })
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

    const handleTaskDrag = (event) => {
        setSelectedTask(event.target.id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();

        if (selectedTask === event.target.id) return;

        updateTaskState(selectedTask, event.target.id);
    }

    const tasksList = ({ tasks, boardTitle, deleteTask }) => {
        // eslint-disable-next-line react/prop-types
        return tasks?.map((task) => {
            return task.state === boardTitle ? (
                <li key={task.id} id={task.id} className="task" draggable onDragStart={handleTaskDrag} >
                    <button className="task-button" onClick={() => {
                        setIsModalOpen(true);
                        setSelectedTask(task.id);
                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg></button>
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

    return (
        <DndProvider backend={HTML5Backend} >
            <div>
                <Header onOpenModal={openModal} />
                <div className="board-container">
                    <div className="boards" id={boardTitles[0]} onDragEnter={handleDragOver}>
                        <div className="board-title">{boardTitles[0]}</div>
                        <div className="board-content">
                            <div className="tasks">
                                {tasksList({ tasks, boardTitle: boardTitles[0], deleteTask })}
                            </div>
                        </div>
                    </div>
                    <div className="boards" id={boardTitles[1]} onDragEnter={handleDragOver}  >
                        <div className="board-title">{boardTitles[1]}</div>
                        <div className="board-content">
                            <div className="tasks">
                                {tasksList({ tasks, boardTitle: boardTitles[1], deleteTask })}
                            </div>
                        </div>
                    </div>
                    <div className="boards" id={boardTitles[2]} onDragEnter={handleDragOver}>
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
                    updateTaskName={updateTaskName}
                    selectedTask={selectedTask}
                />
            </div>
        </DndProvider>
    );
};

export default Home;
