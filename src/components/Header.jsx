import React from "react";

const Header = () => {
    return (
        <div>
            <header>
                <h1 className="title">Gerenciador de Tarefas</h1>
                <div className="header-buttons-container">
                    <a className="header-buttons" href="/home">Nova tarefa</a>
                    <a className="header-buttons" href="/">Sair</a>
                </div>
            </header>
        </div>
    );
}

export default Header;