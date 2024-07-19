import React from "react";
import { useNavigate } from 'react-router-dom';

export default function NavHome() {

    const navigate = useNavigate();

    function handleClickRegistration() {
        navigate('/registration');
    }

    function handleClickLogin() {
        navigate('/login');
    }

    function handleClickHome() {
        navigate('/');
    }

    return (
        <nav>
            <p onClick={handleClickHome}>Accueil</p>
            <p onClick={handleClickRegistration}>Inscription</p>
            <p onClick={handleClickLogin}>Connexion</p>
        </nav>
    );
}