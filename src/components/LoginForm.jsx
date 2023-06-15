import { useForm } from "react-hook-form";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm () {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const auth = getAuth();
            const { email, password } = data;
            // Faça a autenticação do usuário com o Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Se o usuário for autenticado com sucesso, redirecione ele para a página inicial
            if (userCredential) {
                window.location.href = "/home";
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="login-title">Gerenciador de Tarefas</h1>
                <div className="login-form-container">
                    <div className="login-form">
                        <div className="login-form-group">
                            <input type="email" id="email" name="email" placeholder="E-mail" className="login-form-field" {...register("email", { required: true })} />
                        </div>
                        <div className="login-form-group">
                            <input type="password" id="password" name="password" placeholder="Senha" className="login-form-field" {...register("password", { required: true })} />
                        </div>
                        <a href="/recover" className="forgotten-password-button">Esqueceu a senha?</a>
                        <div className="login-form-buttons-container">
                            <a href="/create" className="login-form-buttons">Criar Conta</a>
                            <input type="submit" value="Entrar" className="login-form-buttons" />
                        </div>
                    </div>
                </div>
            </div>

            {errors.email && <span className="submit-error"> E-mail é obrigatório </span>}
            {errors.password && <span className="submit-error"> Senha é obrigatória </span>}
        </form>
    )

}