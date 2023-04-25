import React from "react";

const LoginPage = () => {
    return (
        <div>
            <h1 className="login-title">Gerenciador de Tarefas</h1>
            <div className="login-form-container">
                <div className="login-form">
                    <div className="login-form-group">
                        <input type="email" id="email" name="email" placeholder="E-mail" className="login-form-field" />
                    </div>
                    <div className="login-form-group">
                        <input type="password" id="password" name="password" placeholder="Senha" className="login-form-field" />
                    </div>
                    <a href="/" className="forgotten-password-button">Esqueceu a senha?</a>
                    <div className="login-form-buttons-container">
                        <a href="/" className="login-form-buttons">Criar Conta</a>
                        <a href="/home" className="login-form-buttons">Entrar</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;