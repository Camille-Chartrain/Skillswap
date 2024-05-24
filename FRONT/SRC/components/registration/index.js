import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
// import { schema } from '../../util';
// import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from 'js-cookie';
import { useState } from "react"




const Registration = ({ handleSubmit, register, isValid, isSubmitSuccessful, setToken, }) => {

    //-> show error from back{
    const [error, setError] = useState([]);

    //-> function to send datas in the back and api's call
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

            const dataFetch = await response.json();
            console.log(" response apres .json:", dataFetch);

            const token = dataFetch.accessToken;
            console.log("token", token);
            Cookies.set('token', token);

            console.log("error?:", dataFetch.error);
            setError(dataFetch.error);
        }
        catch (error) {
            console.log("erreur", error);
        };
    }


    return (
        <main>
            <h2>Inscription</h2>
            <div className="error">

                {error ? (error?.message) : ("")}
            </div>
            <div>

                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="formRegistration">

                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" name="firstname" {...register('firstname')} size="25" required />

                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" name="lastname" required {...register('lastname')} size="25" />

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" required {...register('email')} size="35" placeholder="  monadresse@gmail.com" />

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" className="isValid" required {...register('password')} size="35" placeholder="  12 caracteres minimun" />

                    <label htmlFor="newPassword">Confirmer votre mot de passe :</label>
                    <input type="password" id="newPassword" name="newPassword" required {...register('newPassword')} size="35" />

                    <button type="submit" disabled={isValid} > VALIDER</button>
                </form>

            </div >
        </main >
    )


}
export default Registration;