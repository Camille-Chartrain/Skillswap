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