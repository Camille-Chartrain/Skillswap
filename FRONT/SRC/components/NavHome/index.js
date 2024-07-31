import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './navHome.scss'; // Import SCSS as a module
import skillswap from '../../style/base/icones/skillswap.jpg';


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
        <nav className="navHome">
            <button
                onClick={handleClickHome} aria-label="Accueil"
            >
                <h1>
                    <img src={skillswap} alt="SkillSwap" />
                </h1>
            </button>

            <button
                onClick={handleClickLogin} aria-label="connection"
            >
                <FontAwesomeIcon
                    icon={faUser}
                    className="icone iconeLogin"
                />
            </button>

            <button
                onClick={handleClickRegistration} aria-label="Inscription"
            >
                <FontAwesomeIcon
                    icon={faUserPlus}
                    className="icone iconeRegister"
                />
            </button>

        </nav>
    );
}