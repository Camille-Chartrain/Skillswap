import { useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Registration = ({ handleSubmit, register, isValid }) => {

    //= show error from back{
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    //= function to send datas in the back and api's call
    const onSubmit = async (data) => {
        try {
            console.log('try data:', data);
            const response = await fetch('http://localhost:3000/registration', {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'accessToken',
                },
                body: JSON.stringify(data)
            });
            console.log('response.status:', response.status);

            //=traduct api response in Json
            const dataFetch = await response.json();
            console.log(" response apres .json:", dataFetch);

            //= fetch the user token in the data and store with Cookies.set
            const token = dataFetch.accessToken;
            console.log("token", token);
            Cookies.set('token', token);

            //=fetch back side's  errors
            console.log("error?:", dataFetch.error);
            setError(dataFetch.error);

            {/* //= manage and show error for user */ }
            if (dataFetch.accessToken) {
                navigate("/dashboard");
            }
            else { <span className="error">return({error?.message})</span> }
        }
        catch (error) {
            console.log("erreur", error);
        };
    }


    return (
        <main>
            <h2>Inscription</h2>

            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="formRegistration">

                {/* //= with register from useForm, it possible to fetch or send values to the back */}

                <label htmlFor="firstname">Prénom * :</label>
                <input type="text" id="firstname" name="firstname" {...register('firstname')} size="25" required />

                <label htmlFor="lastname">Nom * :</label>
                <input type="text" id="lastname" name="lastname" required {...register('lastname')} size="25" />

                <label htmlFor="email">Email * :</label>
                <input type="email" id="email" name="email" required {...register('email')} size="35" placeholder="  monadresse@gmail.com" />

                <label htmlFor="password">Mot de passe * :</label>
                <small>Minimum 12 caracteres (dont au moins : 1 maj, 1 min, 1 chiffre, 1 caractere special)</small>
                <input type="password" id="password" name="password" className="isValid" required {...register('password')} size="35" placeholder="  12 caracteres minimun" />

                <label htmlFor="newPassword">Confirmer votre mot de passe * :</label>
                <input type="password" id="newPassword" name="newPassword" required {...register('newPassword')} size="35" />

                <button type="submit" disabled={isValid} > VALIDER</button>
            </form>
        </main >
    )


}
export default Registration;