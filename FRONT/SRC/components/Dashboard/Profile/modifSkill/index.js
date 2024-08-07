import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Level from '../../../SearchBar/Level';
import Categories from '../../../SearchBar/Categories';
import SubCategories from '../../../SearchBar/SubCategories';
import Level from '../../../SearchBar/Level';
import "./style.scss";

export default function ModifSkill({
    // loading,
    // setLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedLevel,
    setSelectedLevel,
    optionsHTML
}) {

    const formRef = useRef(null);
    const navigate = useNavigate();

    // Utiliser useLocation pour accéder à l'état passé depuis l'autre page
    const location = useLocation();

    // Extraire l'état depuis location.state
    const { skill } = location.state || {};

    const [skillData, setSkillData] = useState({
        title: skill?.title || '',
        duration: skill?.duration || '',
        transmission: skill?.transmission || '',
        description: skill?.description || '',
        availability: skill?.availability || '',
        // CategoryId: selectedCategory,
        // SubCategoryId: skill?.SubCategoryId || '',
        // level: skill?.level || ''
    });


    function handleChange(event) {
        const { name, value } = event.target;
        console.log("event.target.value", event.target.value);
        setSkillData(prevSkillData => ({
            ...prevSkillData,
            [name]: value
        }));
    }


    async function handleSubmit(event) {
        event.preventDefault()
        console.log("dans le handlesubmit modifskill");

        const dataSkill = {
            ...skillData,
            CategoryId: selectedCategory,
            SubCategoryId: selectedSubCategory,
            level: selectedLevel
        };

        console.log("dataskill dans handleSubmit", dataSkill);

        try {
            console.log("dans le try modifskill");

            const token = Cookies.get('token');

            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/skill/${skill.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataSkill)
                // credentials: 'include'
            })

            const res = await response.json();
            console.log('qui est res avant if:', res);

            if (res === "update du skill ok") {
                formRef.current.reset();
                setSelectedCategory(null);
                setSelectedSubCategory(null);
                setSelectedLevel("");
                navigate('/dashboard/profile');
            }
            else {
                throw new Error("Invalid response from API");
            }
        }
        catch (error) {
            console.log("catch de patchSkillUpDate:", error);
            //     setError("Votre modification n'a pas ete prise en compte");
            //     handleNotFoundError("Votre modification n'a pas ete prise en compte");
            // }
        }
    }



    return (
        <div className='modif_skill'>

            {skill ? (

                <form
                    ref={formRef} // Référence au formulaire
                    method="PATCH"
                    onSubmit={handleSubmit}
                    className="form"
                >
                    <fieldset className="fieldset">
                        <legend>Modification compétence</legend>


                        <label htmlFor="title">Titre * :</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={skillData.title}
                            onChange={handleChange}
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
                            value={skillData.duration}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="transmission"> Mode de transmission * :</label>
                        {/* <SearchTransmission  /> */}

                        <label htmlFor="description">Descriptif * :</label>
                        <textarea
                            id="description"
                            type="text"
                            name="description"
                            value={skillData.description}
                            onChange={handleChange}
                            rows="5"
                            cols="33"
                            required
                        />

                        <label htmlFor="availability">Disponibilité * :</label>
                        <input
                            id="availability"
                            type="text"
                            name="availability"
                            value={skillData.availability}
                            onChange={handleChange}
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

            ) : (
                <p>Aucune compétence trouvée.</p>
            )}

        </div>
    );
}
