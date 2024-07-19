import React from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {

        try {
            console.log("deconnection => supprimer cookie. (composant Logout)");
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/logout`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            console.log("response", response);
            const resultLogout = await response.json();
            // console.log('response component dashboard logout:', resultLogout);

            // delete cookie JWT on client's side
            let thisToken = Cookies.remove('token');
            thisToken = null
            if (thisToken == null) {
                console.log("token", thisToken);
                navigate("/");
            }
        }
        catch (error) {
            console.log("erreur :", error);
        };
    }

    return (
        <div>
            <h1 onClick={handleClick}>Deconnexion</h1>
        </div>
    )
}