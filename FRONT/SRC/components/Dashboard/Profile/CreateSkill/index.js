import { React, useState, useEffect } from "react";
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
        setSelectedSubCategory,
        setSelectedLevel,
        optionsHTML
    }
) {


    const handleSubmit = async () => {

        try {

            console.log("selectedCategory dans try", selectedCategory);
            console.log("selectedSubCategory dans try", selectedSubCategory);
            console.log("selectLevel dans try", selectLevel);
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/skill/?&CategoryId=${selectedCategory?.id}&SubCategoryId=${selectedSubCategory?.id}`, {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
                // credentials: 'include'
            })

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);
            reset();
            GetAllSkillUser();
        }
        catch (error) {
            console.log("erreur cath :", error);
            setError("Erreur lors de la creation de Competence");
            handleNotFoundError("Erreur lors de la creation de Competence");
        }

    }
    useEffect(() => { }, [])


    return (
        <form
            method="POST"
            onSubmit={handleSubmit}
            className="updateAskill">

            <fieldset className="skillUpDate">
                <legend><h3>Création de competence</h3></legend>

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

                <label htmlFor="duration">Duree * :</label>
                <input
                    id="duration"
                    type="text"
                    name="duration"
                    required
                />

                <label htmlFor="transmission"> Mode de transmission * :</label>
                {/* <SearchTransmission  /> */}

                <label htmlFor="description">Descriptif * :</label>
                <textarea
                    id="description"
                    type="text"
                    name="description"
                    rows="5"
                    cols="33"
                    required
                />

                <label htmlFor="availability">Disponibilite * :</label>
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