import React from "react";

export default function Level({ setSelectedLevel }) {

    const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value);
        console.log("Level sélectionnée :", event.target.value);
    };

    return (
        <select onChange={handleLevelChange}>
            <option value="">Niveau</option>
            <option value="débutant">Débutant</option>
            <option value="intermédiaire">Intermédiaire</option>
            <option value="avancée">Avancé</option>
        </select >
    )
}