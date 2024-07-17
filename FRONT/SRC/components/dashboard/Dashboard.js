import React from "react";
import Navbar from "../Navbar/NavBar";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="/dashboard/notifications">notifs </Link>
                <Link to="/dashboard/statistics">Stats </Link>
                <Link to="/dashboard/profile">profil </Link>
                <Link to="/dashboard/teachingDesk">bureau</Link>
            </nav>
            <Outlet />
        </div>
    )
}