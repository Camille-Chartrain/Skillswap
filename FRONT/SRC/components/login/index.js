import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Error from '../error/error';

const Login = ({ handleSubmit, register, isValid, handleNotFoundError, setError, error }) => {

    const [isLogged, setIsLogged] = useState(true);
    const navigate = useNavigate();

    //-> api's call    
    const GetIsLogged = async (data) => {
        //= send the token stocked to login
        try {
            // console.log('données envoyées req login', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/login`, {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
                // credentials: 'include'
            })

            //=traduct api response in Json
            // console.log("login response avant .json", response);
            const dataIsLogged = await response.json();
            // console.log('login reponse apres .json :', dataIsLogged)

            //= check if there is a new token associated with the user and store it with Cookies.set
            if (dataIsLogged.accessToken) {
                const newToken = dataIsLogged.accessToken;
                // console.log("token", newToken);
                Cookies.set('token', newToken);

                if (dataIsLogged.role === 'admin') {
                    console.log("dataIsLogged.role", dataIsLogged.role);
                    navigate("/admin");
                }
                else {
                    navigate("/dashboard");
                }

            }
            else if (dataIsLogged.message === "token validé") {
                console.log("redirection vers dashboard ou admin sans nouveau token");
                if (dataIsLogged.role === 'admin') {
                    console.log("dataIsLogged.role", dataIsLogged.role);
                    navigate("/admin");
                }
                else {
                    navigate("/dashboard");
                }
            }
            setError("Connexion impossible, merci de recommencer");
            handleNotFoundError("Connexion impossible, merci de recommencer");
        }
        catch (error) {
            console.log('erreur: ', error);
            setError("Connexion impossible, merci de recommencer");
            handleNotFoundError("Connexion impossible, merci de recommencer");
        }

    }

    return (
        <>
            {error && <Error error={error} />}
            <h2>Connexion</h2>

            <form method="POST" onSubmit={handleSubmit(GetIsLogged)} className="formLogin">

                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder="Saisissez votre email" required {...register('email')} size="30" autoComplete="on" />

                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" name="password" placeholder="Saisissez votre mot de passe" required {...register('password')} size="35" data-np-autofill-field-type="password" autoComplete="on" />

                <button diseable={isValid}>VALIDER</button>
            </form>
        </>
    )
}
export default Login;