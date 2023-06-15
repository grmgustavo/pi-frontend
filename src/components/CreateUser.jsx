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
                window.location.href = "/home";
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        
    )
}
