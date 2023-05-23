const Modal = ({ isOpen, onClose, onTaskNameChange, onCreateTask }) => {
    if (!isOpen) return null;

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
};

export default Modal;
