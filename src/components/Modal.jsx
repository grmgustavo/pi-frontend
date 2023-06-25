// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, onTaskNameChange, onCreateTask, selectedTask, updateTaskName }) => {
    if (!isOpen) return null;

    if (!selectedTask) {
        return (
            <div className="new-task-modal">
                <div className="modal-content">
                    <div className="new-task-form">
                        <p className="new-task-title">Nova Tarefa</p>
                        <input
                            type="text"
                            className="input-new-task"
                            placeholder="Nome da nova tarefa"
                            onChange={onTaskNameChange}
                        />
                        <div className="new-task-buttons-container">
                            <button className="new-task-buttons" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="new-task-buttons" onClick={onCreateTask}>
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedTask) {
        return (
            <div className="new-task-modal">
                <div className="modal-content">
                    <div className="new-task-form">
                        <p className="new-task-title">Editar Tarefa</p>
                        <input
                            type="text"
                            className="input-new-task"
                            placeholder="Nome da nova tarefa"
                            onChange={onTaskNameChange}
                        />
                        <div className="new-task-buttons-container">
                            <button className="new-task-buttons" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="new-task-buttons" onClick={async () => {
                                await updateTaskName(selectedTask)
                                window.location.reload()
                            }}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Modal;
