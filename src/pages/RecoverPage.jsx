import React from "react";

const RecoverPage = () => {
    return (
        <div>
            <h1 className="login-title">Gerenciador de Tarefas</h1>
            <div className="login-form-container">
                <div className="login-form">
                    <br />
                    <div className="login-form-group">
                        <input type="email" id="email" name="email" placeholder="E-mail" className="login-form-field" />
                    </div>
                    <br />
                    <div className="login-form-buttons-container">

                        <a href="/" className="login-form-buttons">Voltar</a>
                        <a href="/" className="login-form-buttons">Redefinir Senha</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverPage;