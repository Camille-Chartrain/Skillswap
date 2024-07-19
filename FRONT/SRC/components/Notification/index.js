import React, { useEffect } from "react";


export default function Notifications({ setDataCards }) {

    useEffect(() => {
        setDataCards({
            rows: [],
            count: 0,
            resultCount: 0,
        })
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
        </div>
    )
}