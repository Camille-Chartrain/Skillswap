import { React, useEffect } from "react";

export default function Profile({ }) {

    useEffect(() => {
        console.log("dans le use effect de profil rest dataCards");

    }, []);

    return (
        <div>
            <h1>Profil</h1>
        </div>
    )
}