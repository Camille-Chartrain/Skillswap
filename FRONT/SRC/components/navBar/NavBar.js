import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav>
            <Link to="/profile">Profil</Link>
            <Link to="/statistics">Statistiques</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/teachingDesk">Espace Prof - élève</Link>
        </nav>
    );
}