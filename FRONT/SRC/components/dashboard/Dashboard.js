import { React, useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, Outlet } from "react-router-dom";
import Cards from "../Cards";
import Logout from "../Logout";

export default function Dashboard({
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedLevel,
    setSelectedLevel,
    searchInput,
    setSearchInput,
    setDataCards,
    dataCards,
    match,
    setMatch,
    noMatch,
    setNoMatch,
    loading,
    setLoading
}) {

    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="/dashboard/notifications">notifs </Link>
                <Link to="/dashboard/statistics">Stats </Link>
                <Link to="/dashboard/profile">profil </Link>
                <Link to="/dashboard/desk">bureau</Link>
                <Logout />
            </nav>

            <SearchBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setDataCards={setDataCards}
                match={match}
                setMatch={setMatch}
                noMatch={noMatch}
                setNoMatch={setNoMatch}
                setLoading={setLoading}
            />
            <Outlet />
            <Cards
                dataCards={dataCards}
                match={match}
                noMatch={noMatch}
                loading={loading}
            />

        </div>
    )
}