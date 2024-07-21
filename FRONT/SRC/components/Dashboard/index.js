import { React, useEffect } from "react";
import SearchBar from "../SearchBar";
import NavLogged from "./NavLogged";


export default function Dashboard(
    {
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedLevel,
        setSelectedLevel,
        searchInput,
        setSearchInput,
        setDataCards,
        match,
        setMatch,
        noMatch,
        setNoMatch,
        setLoading,
        setLogged
    }
) {


    useEffect(() => {
        setLogged(true);
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <NavLogged
                setLogged={setLogged}
            />
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
                setLogged={setLogged}
            />
        </div>
    )
}