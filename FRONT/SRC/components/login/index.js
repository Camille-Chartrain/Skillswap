import { useState } from "react";


const Login = ({ setToken, token, handleSubmit, register, errors, isValid, isSubmitSuccessful }) => {

    const [isLogged, setIsLogged] = useState(true);


    const GetIsLogged = async (data) => {

        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            })
            // setToken(response.accessToken);
            // const dataIsLogged = await response.json();
            console.log("Token :", token);


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