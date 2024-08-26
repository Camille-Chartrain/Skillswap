import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import the library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the css
import Cookies from 'js-cookie';
import "./style.scss";


export default function CardsSkills(
    {
        loading,
        setLoading,
        skills,
        getSkills }) {

    const navigate = useNavigate();

    async function handlePatchSkill(skill) {

        console.log('skill handlePatchSkill: ', skill)

        // we send the state to the other page
        navigate('/dashboard/profile/modifications',
            {
                state: { skill }
            })
    };

    async function deleteSkill(skill) {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`https://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/${REACT_APP_API}/skill/${skill.id}`, {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(skill),
                // credentials: 'include'
            })

            console.log("response avant .json", response);
            const responseDelete = await response.json();
            console.log("responseDelete apres json :", responseDelete);
            getSkills();
        }
        catch (error) {
            console.log("catch deleSkill:", error);
            // setError("Impossible de sdupprimer cette competence");
            // handleNotFoundError("Impossible de sdupprimer cette competence");

        }
    };

    async function handleDeleteSkill(skill) {
        confirmAlert({
            title: 'Confirmation de suppression',
            message: 'Êtes-vous sûr de vouloir supprimer cette compétence ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        console.log("on supprime ce skill:", skill);
                        deleteSkill(skill);
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
            <section className="all_cards">
                <h3 className="title_skills">Vos compétences</h3>
                {loading && <p>Chargement...</p>}
                <div className="cards_skills">
                    {skills?.map((skill) => (

                        <article
                            key={skill?.id}
                            className="card">

                            <h3 className="">{skill?.title} </h3>
                            <p>{skill?.level}</p>
                            <p>{skill?.Category.name}</p>
                            <p>{skill?.SubCategory.name}</p>
                            <p>{skill?.createdAt}</p>
                            <div className="buttons">
                                <button
                                    // type "button" n'a pas de comportement prédéfini => pour exécuter une action personnalisée JS.
                                    type="button"
                                    aria-label="modifier la compétence"
                                    // fonction fléchée pour ne pas executer la fonction directement
                                    onClick={() => handlePatchSkill(skill)}
                                >
                                    MODIFIER
                                </button>

                                <button
                                    aria-label="supprimer la compétence"
                                    onClick={() => handleDeleteSkill(skill)}
                                    type="button"
                                >
                                    SUPPRIMER
                                </button>
                            </div>

                        </article >
                    ))
                    }
                </div>
            </section>
        </>
    )
}
