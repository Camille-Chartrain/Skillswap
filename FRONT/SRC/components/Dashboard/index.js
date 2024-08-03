import { React, useEffect } from "react";
import NavLogged from "./NavLogged";

export default function Dashboard(
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
                setNoMatch={setNoMatch}
                setMatch={setMatch}
            />
        </div>
    )
}