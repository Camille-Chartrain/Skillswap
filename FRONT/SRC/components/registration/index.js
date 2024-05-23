import { useEffect, useState } from "react";



const Registration = ({ handleSubmit, register, errors, isValid, isSubmitSuccessful, formState }) => {

    // //-> show error from back{
    const [error, setError] = useState({});

    //-> function to send datas in the back and api's call
    const onSubmit = async (data) => {


        try {
            console.log('try data:', data);
            const response = await fetch('http://localhost:3000/registration', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dataFetch = await response.json();
            console.log(" try response:", dataFetch);

            // //->in case ,fetch back's errors  for show it to user
            {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

            }
        }
        catch (error) {
            setError(error.message);
            console.error('Erreur lors de la soumission du formulaire :', error);
            console.log("erreur", error);
        };
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            setError('');
        }
    }, [isSubmitSuccessful]);



    return (
        <main>
            <h2>Inscription</h2>
            {isSubmitSuccessful && <div className="alert-success">Merci pour votre inscription</div>}

            {/* //= show back's error */}
            {/* {error && <div className="error">{error}</div>} */}

            <div>
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="formRegistration">

                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" name="firstname" {...register('firstname', { required: 'Ce champs est requis' })} size="25" />
                    {<div className="error">{errors && errors.firstname && errors?.firstname?.message}</div>}

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

                    <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                    <input type="password" id="confPassword" name="confPassword" {...register('confPassword', { required: 'Confirmation mot de passe obligatoire' })} size="35" />
                    {<div className="error">{errors && errors.confPassword && errors?.confPassword?.message}</div>}


                    <a href="/dashboard" alt="validation et redirection dashboard"><button type="submit" disabled={isValid}> VALIDER</button></a>
                </form>

            </div >
        </main>
    )

}
export default Registration;