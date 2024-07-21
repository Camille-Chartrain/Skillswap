import { React, useEffect } from "react";

export default function Profile({ setDataCards }) {

    useEffect(() => {
        console.log("dans le use effect de profil rest dataCards");
        setDataCards({
            rows: [],
            count: 0,
            resultCount: 0,
        })
    }, []);

    return (
        <div>
            <h1>Profil</h1>
        </div>
    )
}