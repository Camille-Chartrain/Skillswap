import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import NavHome from "../NavHome";
import PasswordInput from "./PasswordInput";

export default function Registration() {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();
        console.log("event.target", event.target);
        // Récupération des données du formulaire
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        // Validation de l'email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("L'adresse email est invalide.");
            return; // Arrête la soumission du formulaire
        }

        // Validation du mot de passe
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,64}$/;
        if (!passwordPattern.test(password)) {
            setError("Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial @$!%*?&.");
            return; // Arrête la soumission du formulaire
        }


        // Si la validation est réussie, réinitialisation des erreurs
        setError("");



        const myFormData = new FormData(event.target);
        const formDataEncoded = new URLSearchParams(myFormData);


        try {
            console.log('try data:', formDataEncoded);
            // console.log('try myformdata:', myFormData);
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/registration`, {
                method: "post",
                status: 200,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'accessToken',
                },
                body: formDataEncoded
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
            // setError(dataFetch.error);

            {/* //= manage and show error for user */ }
            if (dataFetch.accessToken) {
                navigate("/dashboard/results");
            }
            else { <span className="error">return({error?.message})</span> }
        }
        catch (error) {
            console.log("erreur", error);
            // setError("Erreur lors de votre inscription");
            // handleNotFoundError("Erreur lors de votre inscription");
        };
    }


    function goLogin() {
        console.log("dans goLogin");
        navigate("/login");
    }

    return (
        <>
            <NavHome />
            <h2>Inscription</h2>
            <main>
                {error && <span className="error">{error}</span>}

                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="formRegistration"
                >
                    <label htmlFor="firstname">Prénom * :</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        maxLength="50"
                        required
                    />

                    <label htmlFor="lastname">Nom * :</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        maxLength="100"
                        required
                    />

                    <label htmlFor="email">Email * :</label>
                    <input type="email"
                        id="email"
                        name="email"
                        maxLength="254"
                        required
                    />

                    <PasswordInput />

                    <button type="submit">Envoyer</button>
                </form>

                <p>J'ai déjà un compte</p>
                <button type="button" onClick={goLogin}>Me connecter</button>
            </main >
        </>
    )


}