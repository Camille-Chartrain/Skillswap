import { React, useEffect, useState } from "react";
import NavHome from "../NavHome";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Login({ setNoMatch }) {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    setNoMatch(false)

    async function handleSubmit(event) {

        event.preventDefault();

        const myFormData = new FormData(event.target);
        const formDataEncoded = new URLSearchParams(myFormData);

        try {
            console.log('try data:', formDataEncoded);

            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/login`, {
                method: "post",
                status: 200,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataEncoded
            })

            console.log("login response avant .json", response);
            const dataIsLogged = await response.json();
            console.log('login reponse apres .json :', dataIsLogged)
            console.log("dataIslogged.error", dataIsLogged.error);
            if (dataIsLogged.error === "2Mauvais couple identifiant/mot de passe" || dataIsLogged.error === 'Mauvais couple identifiant/mot de passe') {
                setError("Mauvais couple identifiant / mot de passe")
            }

            //= check if there is a new token associated with the user and store it with Cookies.set
            if (dataIsLogged.accessToken) {
                const newToken = dataIsLogged.accessToken;
                console.log("token", newToken);
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
        }
        catch (error) {
            console.log('erreur: ', error);
            setError('erreur lors de la connexion');
        }
    }

    return (
        <div>
            <NavHome />
            <h1>Connexion</h1>
            {error && <p>{error}</p>}

            <form method="POST" onSubmit={handleSubmit} className="formLogin">

                <label htmlFor="email">Email * :</label>
                <input type="email" id="email" name="email" maxLength="254" required />

                <label htmlFor="password">Mot de passe * :</label>
                <input type="password" id="password" name="password" minLength="12" maxLength="64" required />

                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}