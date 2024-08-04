import React from "react";
import { useNavigate } from 'react-router-dom';
import Logout from "../../Logout";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSignal, faUser, faMagnifyingGlass, faBell, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import "./style.scss";
import skillswap_icone from '../../../style/icones/skillswap_icone.png';
import idea_icone from '../../../style/icones/idea_icone.png';

export default function NavLogged(
    {
        setLogged,
        setSelectedCategory,
        setSelectedSubCategory,
        setSelectedLevel,
        setSearchInput,
        setNoMatch,
        setMatch,
        swappies
    }
) {

    const navigate = useNavigate();


    function handleClickHome() {
        console.log('vers accueil!!!!!!!!!!!!!');
        setSearchInput("");
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedLevel("");
        setNoMatch(false);
        setMatch(false);
        navigate('/');
    }

    return (
        <>
            <nav className="navLogged">

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
                    <div className="logo_dollar">
                        <div className="swappies">
                            {swappies}
                        </div>
                        <FontAwesomeIcon
                            icon={faDollarSign}
                            className="icone" />
                    </div>

                    <Logout
                        setLogged={setLogged}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedSubCategory={setSelectedSubCategory}
                        setSelectedLevel={setSelectedLevel}
                        setSearchInput={setSearchInput}
                        setNoMatch={setNoMatch}
                        setMatch={setMatch}
                    />
                </div>
            </nav>

            <Outlet />


            <nav className="nav_bottom">
                <Link to="/dashboard/notifications">
                    <FontAwesomeIcon
                        icon={faBell}
                        className="icone"
                    />
                    Notifications
                </Link>

                <Link to="/dashboard/statistics">
                    <FontAwesomeIcon
                        icon={faSignal}
                        className="icone"
                    />
                    Statistiques
                </Link>

                <Link to="/dashboard/profile">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="icone"
                    />
                    Profil
                </Link>

                <Link to="/dashboard/desk">
                    <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="icone" />
                    Bureau
                </Link>

                <Link to="/dashboard/results">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="icone" />
                    Recherche
                </Link>
            </nav>
        </>
    );
}