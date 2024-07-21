import React, { useEffect } from "react";

export default function Desk({ setDataCards, setNoMatch }) {

    useEffect(() => {
        setDataCards({
            rows: [],
            count: 0,
            resultCount: 0,
        })
        setNoMatch(false);
    }, []);

    return (
        <div>
            <h1>Espace prof eleve</h1>
        </div>
    )
}