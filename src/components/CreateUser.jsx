import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";



export default function CreateUser () {
    const auth = getAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            // Faça a autenticação do usuário com o Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Se o usuário for autenticado com sucesso, redirecione ele para a página inicial
            if (userCredential) {
                window.location.href = "/";
                console.log(userCredential);
                alert('Usuario Criado com Sucesso');
                
            }

        } catch (error) {
            console.error(error);
            alert(error)
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
                        <div className="login-form-group">
                            <input type="password" id="password" name="password" placeholder="Repita a Senha" className="login-form-field" {...register("password2", { required: true })} />
                            {/* verificar se as senhas são iguais */}
                        </div>
                        <div className="login-form-buttons-container">
                            <a href="/" className="login-form-buttons">Cancelar</a>
                            <input type="submit" value="Criar Conta" className="login-form-buttons" />
                        </div>
                    </div>
                </div>
            </div>
            {errors.email && <span className="submit-error"> E-mail é obrigatório <br /></span>}
            {errors.password && <span className="submit-error"> Senha é obrigatória </span>}
        </form >
    )
}
