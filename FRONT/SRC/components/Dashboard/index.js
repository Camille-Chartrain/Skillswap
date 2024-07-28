import { React, useEffect } from "react";
import NavLogged from "./NavLogged";

export default function Dashboard(
    {
        setLogged,
        setSelectedCategory,
        setSelectedSubCategory,
        setSelectedLevel,
        setSearchInput,
        setMatch,
        setNoMatch
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
                setSelectedCategory={setSelectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                setSelectedLevel={setSelectedLevel}
                setSearchInput={setSearchInput}
                setMatch={setMatch}
                setNoMatch={setNoMatch}
            />
        </div>
    )
}