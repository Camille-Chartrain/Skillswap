import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faHome, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import skillswap_icone from '../../style/icones/skillswap_icone.png';
import idea_icone from '../../style/icones/idea_icone.png';



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

            <div className="navLeft">
                <button
                    onClick={handleClickHome}
                    aria-label="Accueil"
                    className="logo"
                >
                    <img
                        src={idea_icone}
                        alt="accueil-SkillSwap"
                        className="logoIdea"
                    />

                    <img
                        src={skillswap_icone}
                        alt="accueil-SkillSwap"
                        className="logoSkillswap"
                    />
                </button>
            </div>

            <div className="logoUsers">
                <button
                    onClick={handleClickRegistration}
                    aria-label="Inscription"
                >
                    <FontAwesomeIcon
                        icon={faUserPlus}
                        className="icone iconeRegister"
                    />
                </button>

                <button
                    onClick={handleClickLogin}
                    aria-label="connection"
                >
                    <FontAwesomeIcon
                        icon={faCircleUser}
                        className="icone iconeLogin"
                    />
                </button>
            </div>
        </nav>
    );
}