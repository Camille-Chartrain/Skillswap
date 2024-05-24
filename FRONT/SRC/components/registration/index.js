import { useEffect, useState } from "react";



const Registration = ({ handleSubmit, register, errors, isValid, isSubmitSuccessful, formState }) => {

    //-> show error from back{
    const [error, setError] = useState([]);
    const [token, setToken] = useState(null);

    const url = "/dashboard";

    //-> function to send datas in the back and api's call
    const onSubmit = async (data) => {

        try {
            console.log('try data:', data);
            const response = await fetch('http://localhost:3000/registration', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'accessToken',
                },
                body: JSON.stringify(data),

            });
            console.log('response.status:', response.status);
            const dataFetch = await response.json();
            console.log(" try response:", dataFetch);
            console.log("error?:", dataFetch.error);
            setError(dataFetch.error);
            setToken(dataFetch.accessToken);

            console.log("tout va bien :", dataFetch.accessToken);
            console.log("status? :", dataFetch.status);


        }
        catch (error) {

            // console.error('Erreur lors de la soumission du formulaire :', error); 
            console.log("erreur", error);


        };
    }








    return (
        <main>
            <h2>Inscription</h2>
            <div className="error">
                {error === 'Le mot de passe doit comporter au moins 12 caracteres et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractere special' || 'Un utilisateur utilise déjà cette adresse email' ? error : ("")}</div>
            <div>
                {/* {accessToken" ? "Merci de votre iscription" : "Veuillez vous connecter"} */}


                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="formRegistration">

                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" name="firstname" {...register('firstname', { required: 'Ce champs est requis' })} size="25" />
                    {<div className="error">{error && error.firstname && error?.firstname?.message}</div>}

                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" name="lastname"  {...register('lastname', { required: 'Nom obligatoire' })} size="25" />
                    {<div className="error">{errors && errors.lastname && errors?.lastname?.message}</div>}

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" {...register('email', { required: 'Email obligatoire' })} size="35" placeholder="  monadresse@gmail.com" />
                    {<div className="error">{errors && errors.email && errors?.email?.message}</div>}

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" className="isValid"{...register('password', {
                        required: 'Le mot de passe doit comporter au moins 12 caracteres et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractere special'
                    })} size="35" placeholder="  12 caracteres minimun" />
                    {<div className="error">{errors && errors.password && errors?.password?.message}</div>}

                    <label htmlFor="newPassword">Confirmer votre mot de passe :</label>
                    <input type="password" id="newPassword" name="newPassword" {...register('newPassword', { required: 'Confirmation mot de passe obligatoire' })} size="35" />
                    {<div className="error">{errors && errors.confPassword && errors?.confPassword?.message}</div>}


                    <button type="submit" disabled={isValid} > VALIDER</button>
                </form>

            </div >
        </main >
    )


}
export default Registration;