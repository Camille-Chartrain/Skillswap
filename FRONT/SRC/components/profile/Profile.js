import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function Profile({ setDataCards }) {

    const location = useLocation();

    const removeData = () => {
        console.log('declenchement removeData()');
        setDataCards({
            rows: [],
            count: 0,
            resultCount: 0,
        })
    };

    useEffect(() => {
        if (location.pathname === '/dashboard/profile'
            || location.pathname === '/dashboard/statistics'
            || location.pathname === '/dashboard/notifications'
            || location.pathname === '/dashboard/desk'
        ) {
            // Exécuter la fonction lorsque l'URL est '/example'
            removeData();
        }
    }, [location.pathname])

    return (
        <div>
            <h1>Profil</h1>

        </div>
    )
}