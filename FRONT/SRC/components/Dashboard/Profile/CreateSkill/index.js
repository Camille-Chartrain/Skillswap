import { React, useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import Categories from "../../../SearchBar/Categories";
import SubCategories from "../../../SearchBar/SubCategories";
import Level from "../../../SearchBar/Level";



export default function CreateSkill(
    {
        loading,
        setLoading,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedLevel,
        setSelectedLevel,
        optionsHTML,
        getSkills
    }
) {

    const formRef = useRef(null);

    const handleSubmit = async (event) => {


        event.preventDefault();

        const myFormData = new FormData(event.target);
        myFormData.append('level', selectedLevel);
        console.log("myformdata", myFormData);
        const formDataEncoded = new URLSearchParams(myFormData);


        try {

            // console.log("selectedCategory dans CreateSkill", selectedCategory);
            // console.log("selectedSubCategory dans CreateSkill", selectedSubCategory);
            // console.log("selectLevel dans CreateSkill", selectedLevel);
            // console.log('formDataEncoded CreateSkill:', formDataEncoded);

            const token = Cookies.get('token');
            const response = await fetch(`https://${process.env.REACT_APP_API_URL}/skill/?&CategoryId=${selectedCategory}&SubCategoryId=${selectedSubCategory}`, {
                method: "POST",
                status: 200,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataEncoded
            })

            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);

            // reload displays of all skills
            getSkills();
            // Réinitialiser le formulaire et les states
            formRef.current.reset();
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setSelectedLevel("");

        }
        catch (error) {
            console.log("erreur cath :", error);
            // setError("Erreur lors de la creation de Competence");
            // handleNotFoundError("Erreur lors de la creation de Competence");
        }

    }
    useEffect(() => { }, [])


    return (
        <form
            ref={formRef} // Référence au formulaire
            method="POST"
            onSubmit={handleSubmit}
            className="updateAskill">

            <fieldset className="skillUpDate">
                <legend>Création compétence</legend>

                <label htmlFor="title">Titre * :</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                />

                <Categories
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    optionsHTML={optionsHTML}
                />

                <SubCategories
                    selectedCategory={selectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                    optionsHTML={optionsHTML}
                />

                <Level
                    setSelectedLevel={setSelectedLevel}
                    optionsHTML={optionsHTML}
                />

                <label htmlFor="duration">Durée * :</label>
                <input
                    id="duration"
                    type="text"
                    name="duration"
                    required
                />

                <label htmlFor="transmission"> Mode de transmission * :</label>
                <input
                    id="transmission"
                    type="text"
                    name="transmission"
                    required
                />

                <label htmlFor="description">Descriptif * :</label>
                <textarea
                    id="description"
                    type="text"
                    name="description"
                    rows="5"
                    cols="33"
                    required
                />

                <label htmlFor="availability">Disponibilité * :</label>
                <input
                    id="availability"
                    type="text"
                    name="availability"
                    size="25"
                    required
                />

                <button
                    type="submit"
                >
                    VALIDER
                </button>

            </fieldset>
        </form >
    )
}
