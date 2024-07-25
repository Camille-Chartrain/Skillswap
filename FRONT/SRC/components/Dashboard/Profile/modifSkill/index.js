import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ModifSkill() {
    // Utiliser useLocation pour accéder à l'état passé
    const location = useLocation();

    // Extraire l'état depuis location.state
    const { skill } = location.state || {};

    return (
        <div>
            <h1>Modifier Compétence</h1>
            {skill ? (
                <div>
                    <p><strong>Titre:</strong> {skill.title}</p>
                    <p><strong>Niveau:</strong> {skill.level}</p>

                </div>
            ) : (
                <p>Aucune compétence trouvée.</p>
            )}
        </div>
    );
}
