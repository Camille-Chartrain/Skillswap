import React from "react";
import { useNavigate } from 'react-router-dom';
import Logout from "../../Logout";
import { Link, Outlet } from "react-router-dom";

export default function NavLogged(
    {
        setLogged,
        setSelectedCategory,
        setSelectedSubCategory,
        setSelectedLevel,
        setSearchInput,
        setNoMatch,
        setMatch
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
        <nav>
            <Link to="/dashboard/notifications">Notifs </Link>
            <Link to="/dashboard/statistics">Stats </Link>
            <Link to="/dashboard/profile">Profil </Link>
            <Link to="/dashboard/desk">bureau </Link>
            <Link to="/dashboard/results">recherche </Link>
            <Logout
                setLogged={setLogged}
                setSelectedCategory={setSelectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                setSelectedLevel={setSelectedLevel}
                setSearchInput={setSearchInput}
                setNoMatch={setNoMatch}
                setMatch={setMatch}
            />
            <p onClick={handleClickHome}>Accueil</p>
            <Outlet />
        </nav>
    );
}