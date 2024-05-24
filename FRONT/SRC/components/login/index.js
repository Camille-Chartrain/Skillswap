import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useState } from "react";

const Login = ({ handleSubmit, register, errors, isValid, isSubmitSuccessful }) => {

    const [isLogged, setIsLogged] = useState(true);

    const GetIsLogged = async (data) => {

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/login`, {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            console.log("response avant .json", response);
            const dataIsLogged = await response.json();
            console.log('reponse apres .json :', dataIsLogged)
        }
        catch (error) {
            console.log(error.message);
        }
    }

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

                <button diseable={isValid}>VALIDER</button>
            </form>
        </>
    )
}
export default Login;