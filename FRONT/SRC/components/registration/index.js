


const Registration = ({ handleSubmit, register, errors, formState: { isValid }, isSubmitSuccessful }) => {


<<<<<<< HEAD
    //->state about post datas
    // const [data, setData] = useState([]);
    // console.log('state data :', data);
    //-> function to send datas in the back and api's call
    const onSubmit = async (data) => {
        // setData(data)
=======
    //-> function to send datas in the back and api's call
    const onSubmit = async (data) => {

>>>>>>> 465b0421d66da5501fe194da974c852c3ea33bcb
        console.log('onsubmit data:', data);
        try {
            console.log('try data:', data);
            const response = await fetch('http://localhost:3000/registration', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
<<<<<<< HEAD
                body: JSON.stringify(data)
            });
            console.log("log de response:", response);
=======
                body: JSON.stringify(data),
            })
            const dataFetch = await response.json();
            console.log(" try response:", response);
            console.log("try responce data:", dataFetch);
>>>>>>> 465b0421d66da5501fe194da974c852c3ea33bcb
        }
        catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            console.log("erreur", error);
        };
    }


    return (
        <>
            <h2>Inscription</h2>
            {isSubmitSuccessful && <div className="alert alert-success">Merci pour votre inscription</div>}
            <div>
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="formRegistration">

                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" name="firstname" {...register('firstname', { required: 'Ce champs est requis' })} size="25" />
                    {<span>{errors?.firstname?.message}</span>}

                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" name="lastname"  {...register('lastname', { required: 'Nom obligatoire' })} size="25" />
                    {<span>{errors?.lastname?.message}</span>}

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" {...register('email', { required: 'Email obligatoire' })} size="35" placeholder="  monadresse@gmail.com" />
                    {<span>{errors?.email?.message}</span>}

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" className="isValid"{...register('password', {
                        required: 'Le mot de passe doit comporter au moins 12 caracteres et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractere special'
                    })} size="35" placeholder="  12 caracteres minimun" />
                    {<span>{errors?.password?.message}</span>}

                    <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                    <input type="password" id="confPassword" name="confPassword" {...register('confPassword', { required: 'Confirmation mot de passe obligatoire' })} size="35" />
                    {<span>{errors?.confPassword?.message}</span>}

                    <button type="submit" disabled={!isValid}> VALIDER</button>
                </form>

            </div >
        </>
    )
}
export default Registration;