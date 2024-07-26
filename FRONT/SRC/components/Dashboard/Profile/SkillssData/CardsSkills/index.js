import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import the library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the css


export default function CardsSkills({ loading, setLoading, skills }) {

    const navigate = useNavigate();

    async function handlePatchSkill(skill) {

        console.log('skill handlePatchSkill: ', skill)

        // we send the state to the other page
        navigate('/dashboard/profile/modifications',
            {
                state: { skill }
            })
    };



    async function handleDeleteSkill(skill) {
        confirmAlert({
            title: 'Confirmation de suppression',
            message: 'Êtes-vous sûr de vouloir supprimer cette compétence ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        console.log("il faudra supprimer", skill);
                        // Ajoutez ici la logique pour supprimer la compétence
                    }
                },
                {
                    label: 'Non',
                    onClick: () => console.log("Suppression annulée")
                }
            ]
        });
    }

    return (
        <>
            {loading && <p>Chargement...</p>}
            <section>
                {skills?.map((skill) => (

                    <article
                        key={skill?.id}
                        className="">

                        <h3 className="">{skill?.title} </h3>
                        <p>{skill?.level}</p>
                        <p>{skill?.Category.name}</p>
                        <p>{skill?.SubCategory.name}</p>
                        <p>{skill?.createdAt}</p>

                        <button
                            className=""
                            // type "button" n'a pas de comportement prédéfini => pour exécuter une action personnalisée JS.
                            type="button"
                            aria-label="modifier la compétence"
                            // fonction fléchée pour ne pas executer la fonction directement
                            onClick={() => handlePatchSkill(skill)}
                        >
                            MODIFIER
                        </button>

                        <button
                            className=""
                            aria-label="supprimer la compétence"
                            onClick={() => handleDeleteSkill(skill)}
                            type="button"
                        >
                            SUPPRIMER
                        </button>

                    </article >
                ))
                }
            </section>
        </>
    )
}