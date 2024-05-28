import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Login = ({ handleSubmit, register, isValid }) => {

    const [isLogged, setIsLogged] = useState(true);
    const navigate = useNavigate();

    //-> api's call    
    const GetIsLogged = async (data) => {
        //= send the token stocked to login
        try {
            const token = Cookies.get('token');
            const response = await fetch("http://localhost:3000/login", {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataIsLogged = await response.json();
            console.log('reponse apres .json :', dataIsLogged)

            {/* //= manage and show error for user */ }
            if (dataIsLogged) {
                navigate("/dashboard");
            }
            else { <div className="error">return({error?.message})</div> };
        }
        catch (error) {
            console.log(error.message);
        }

    }

    return (
        <>
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