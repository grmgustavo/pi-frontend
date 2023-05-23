const Header = ({ onOpenModal }) => {
    return (
        <div>
            <header>
                <h1 className="title">Gerenciador de Tarefas</h1>
                <div className="header-buttons-container">
                    <button className="header-buttons" onClick={onOpenModal}>
                        Nova tarefa
                    </button>
                    <a className="header-buttons" href="/">
                        Sair
                    </a>
                </div>
            </header>
        </div>
    );
};

export default Header;
