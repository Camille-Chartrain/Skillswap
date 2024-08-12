import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Desk({ }) {

    useEffect(() => {
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="Page d'historiques des cours pris et donnés par l'utilisateur. Permet de refuser ou accepter des demandes de cours, noter des cours que l'on a pris et suivre les demandes que l'on a envoyé aux autres utilisateurs." />
                <title>Bureau - Skillswap</title>
            </Helmet>

            <h1>Espace prof eleve</h1>
        </>
    )
}