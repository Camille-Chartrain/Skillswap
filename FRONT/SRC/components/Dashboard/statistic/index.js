import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Statistics({ }) {

    useEffect(() => {

    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="Pages repertoriant les statistiques de l'utilisateur, son nombre de swappies, le nombre de cours qu'il a pris et donné etc." />
                <title>Statistiques - Skillswap</title>
            </Helmet>

            <h1>Statistiques</h1>
        </>
    )
}