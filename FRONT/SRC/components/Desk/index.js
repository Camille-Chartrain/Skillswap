import React, { useEffect } from "react";

export default function Desk({ setDataCards }) {

    useEffect(() => {
        setDataCards({
            rows: [],
            count: 0,
            resultCount: 0,
        })
    }, []);

    return (
        <div>
            <h1>Espace prof eleve</h1>
        </div>
    )
}