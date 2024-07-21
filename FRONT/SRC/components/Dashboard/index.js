import { React, useEffect } from "react";
import NavLogged from "./NavLogged";

export default function Dashboard(
    {
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
        </div>
    )
}