import { useState, useEffect } from "react";

const Registration = ({ input }) => {

    const [registration, setRegistration] = useState('');

    const handleSubmit = (e) => {
        e.eventDefault();
        setRegistration();
    }

    const GetRegistration = async () => {
        try {
            const response = await fetch(`http://localhost:3000/registration`);
            const dataRegistration = await response.json();
            setRegistration(dataRegistration)
            console.log(dataRegistration);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => { GetRegistration() }, []);



    return (
        <>
            <h1>Inscription</h1>
            <div>
                <form method="POST" onSubmit={handleSubmit} className="formRegistration">

                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" name="firstname" value={input} size="25" />

                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" name="lastname" value={input} size="25" />

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" value={input} size="35" placeholder="  monadresse@gmail.com" />

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" value={input} size="35" placeholder="  12 caracteres minimun" />

                    <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                    <input type="password" id="confPassword" name="confPassword" value={input} size="35" />

                    <button type="submit">VALIDER</button>
                </form>
            </div>
        </>
    )
}
export default Registration;