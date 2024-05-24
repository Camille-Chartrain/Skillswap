import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = ({ setToken, token, handleSubmit, register, errors, isValid, isSubmitSuccessful }) => {

    const [isLogged, setIsLogged] = useState(true);
    // const [token, setToken] = useState(null);

    // const handleSubmit = (e) => {
    //     e.eventDefault();
    //     setIsLogged();
    // }

    const GetIsLogged = async (data) => {

        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `accessToken ${token}`,
                    'location': '/dashboard',
                },
                body: JSON.stringify(data)
            })

            const dataIsLogged = await response.json();
            // setIsLogged(dataIsLogged)
            console.log('try :', dataIsLogged)
            setToken(dataIsLogged.accessToken);

            console.log("comment ca se passe:", dataIsLogged.accessToken)
        }
        catch (error) {
            console.log(error.message);
        }
    }
    // useEffect(() => { GetIsLogged() }, []);


    return (
        <>
            <h2>Connexion</h2>

            <form method="POST" onSubmit={handleSubmit(GetIsLogged)} className="formLogin">

                {isSubmitSuccessful ? ("Bienvenue") : ('')}

                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder="Saisissez votre email" {...register('email', { required: 'Email requis' })} size="30" />
                {errors?.email?.type === 'required' && (<p role="alert" className="error">{errors?.email?.message}</p>)}



                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" name="password" placeholder="Saisissez votre mot de passe" {...register('password', { required: "Mot de passe requis" })} size="35" />
                {errors?.password?.type === 'required' && (<p role="alert" className="error">{errors?.password?.message}</p>)}

                <button diseable={isValid, isSubmitSuccessful}>VALIDER</button>
            </form>
        </>
    )
}
export default Login;