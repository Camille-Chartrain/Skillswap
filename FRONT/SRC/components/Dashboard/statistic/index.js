import React, { useEffect } from "react";

export default function Statistics({ setDataCards }) {

    useEffect(() => {
        setDataCards({
            rows: [],
            count: 0,
            resultCount: 0,
        })
    }, []);

    return (
        <div>
            <h1>Statistiques</h1>
        </div>
    )
}