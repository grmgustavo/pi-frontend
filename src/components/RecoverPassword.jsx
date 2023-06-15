import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function RecoverPassword () {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const auth = await getAuth();
            const { email } = data;
            // Faça a autenticação do usuário com o Firebase
            const userCredential = await sendPasswordResetEmail(auth, email);
            // Se o usuário for autenticado com sucesso, redirecione ele para a página inicial
            if (userCredential) {
                window.location.href = "/";
                alert("E-mail enviado com sucesso!")
            }
        } catch (error) {
            alert(error);
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="login-title">Gerenciador de Tarefas</h1>
                <div className="login-form-container">
                    <div className="login-form">
                        <br />
                        <div className="login-form-group">
                            <input type="email" id="email" name="email" placeholder="E-mail" className="login-form-field" {...register("email", { required: true })} />
                        </div>
                        <br />
                        <div className="login-form-buttons-container">

                            <a href="/" className="login-form-buttons">Voltar</a>
                            <input type="submit" value="Enviar" className="login-form-buttons" />
                        </div>
                    </div>
                </div>
            </div>
            {errors.email && <span className="submit-error"> E-mail é obrigatório <br /></span>}
        </form>
    )
}