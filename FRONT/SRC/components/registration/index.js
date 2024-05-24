import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
// import { schema } from '../../util';
// import { yupResolver } from "@hookform/resolvers/yup";




const Registration = ({ handleSubmit, register, errors, isValid, isSubmitSuccessful, setToken }) => {

    //-> show error from back{
    const [error, setError] = useState([]);

    const url = "/dashboard";

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
                    'location': '/dashboard',
                },
                body: JSON.stringify(data)
            });


            const fetchStatus = response.status;
            console.log('response.status:', fetchStatus);

            const dataFetch = await response.json();
            console.log(" try response:", dataFetch);
            console.log(dataFetch.error);
            console.log(dataFetch.status);

            setError(dataFetch.error);
            setToken(dataFetch.accessToken);

            console.log("tout va bien :", dataFetch.accessToken);

        }
        catch (error) {
            console.log("erreur", error);
        };
    }


    return (
        <main>
            <h2>Inscription</h2>
            <div className="error">
                {error === true ? 'Le mot de passe doit comporter au moins 12 caracteres et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractere special' || 'Un utilisateur utilise déjà cette adresse email' : ("")}</div>

            {/* {fetchStatus === 200 && ("Bienvenue")} */}
            <div>

                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="formRegistration">

                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" name="firstname" {...register('firstname', { required: 'Prenom requis' })} size="25" />
                    {errors?.firstname?.type === 'required' && (<p role="alert" className="error">{errors?.lastname?.message}</p>)}


                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" name="lastname"  {...register('lastname', { required: 'Nom obligatoire' })} size="25" />
                    {errors?.lastname && (<small className="error">{errors?.lastname?.message}</small>)}

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" {...register('email', { required: 'Email obligatoire' })} size="35" placeholder="  monadresse@gmail.com" />
                    {errors?.email && (<small className="error">{errors?.email?.message}</small>)}

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" className="isValid"{...register('password', {
                        required: 'Le mot de passe doit comporter au moins 12 caracteres et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractere special'
                    })} size="35" placeholder="  12 caracteres minimun" />
                    {errors?.password && (<small className="error">{errors?.password?.message}</small>)}

                    <label htmlFor="newPassword">Confirmer votre mot de passe :</label>
                    <input type="password" id="newPassword" name="newPassword" {...register('newPassword', { required: 'Confirmation mot de passe obligatoire' })} size="35" />
                    {errors?.newPassword && (<small className="error">{errors?.newPassword?.message}</small>)}


                    <button type="submit" disabled={isValid, isSubmitSuccessful} > VALIDER</button>
                </form>

            </div >
        </main >
    )


}
export default Registration;