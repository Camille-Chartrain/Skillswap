import React from "react";
import { useNavigate } from 'react-router-dom';
import Logout from "../Logout";
import { Link, Outlet } from "react-router-dom";

export default function NavLogged({ setLogged }) {

    const navigate = useNavigate();


    function handleClickHome() {
        navigate('/');
    }

    return (
        <nav>
            <Link to="/dashboard/notifications">Notifs </Link>
            <Link to="/dashboard/statistics">Stats </Link>
            <Link to="/dashboard/profile">Profil </Link>
            <Link to="/dashboard/desk">bureau </Link>
            <Logout
                setLogged={setLogged}
            />
            <p onClick={handleClickHome}>Accueil</p>
            <Outlet />
        </nav>
    );
}