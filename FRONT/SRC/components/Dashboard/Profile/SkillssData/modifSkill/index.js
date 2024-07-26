import React from 'react';
import { useLocation } from 'react-router-dom';
import Level from '../../../../SearchBar/Level';
import CategoriesCheckboxes from '../../ProfilePatch/CategoriesCheckboxes';

export default function ModifSkill({
    // loading,
    // setLoading,

}) {
    // Utiliser useLocation pour accéder à l'état passé depuis l'autre page
    const location = useLocation();

    // Extraire l'état depuis location.state
    const { skill } = location.state || {};

    async function handleSubmit() {


        try {

            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/skill/${skill.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(skill),
                // credentials: 'include'
            })

            // //=traduct api response in Json

            const res = await response.json();
            console.log('qui est res avant if:', res);

            if (res === "update du skill ok") {
                reset();
                navigate('/dashboard');
            }
            else {
                throw new Error("Invalid response from API");
            }

            setSkillUpDate(res.data);

        }
        catch (error) {
            console.log("catch de patchSkillUpDate:", error);
            //     setError("Votre modification n'a pas ete prise en compte");
            //     handleNotFoundError("Votre modification n'a pas ete prise en compte");
            // }
        }
    }

    return (
        <div>
            <h1>Modifier Compétence</h1>
            {skill ? (

                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="updateAskill">
                    <fieldset className="skillUpDate">
                        <legend><h3>Modification de competence</h3></legend>

                        <label htmlFor="title">Titre * :</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={skill.title}
                            // onChange={handleChangeSkill}
                            required
                        />
                        {/* 
                    <CategoriesCheckboxes
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    /> */}


                        <label htmlFor="duration">Duree * :</label>
                        <input
                            id="duration"
                            type="text"
                            name="duration"
                            value={skill.duration}
                            // onChange={handleChangeSkill}
                            required
                        />

                        <label htmlFor="transmission"> Mode de transmission * :</label>
                        {/* <SearchTransmission  /> */}

                        <label htmlFor="description">Descriptif * :</label>
                        <textarea
                            id="description"
                            type="text"
                            name="description"
                            value={skill.description}
                            // onChange={handleChangeSkill}
                            rows="5"
                            cols="33"
                            required
                        />

                        <label htmlFor="availability">Disponibilite * :</label>
                        <input
                            id="availability"
                            type="text"
                            name="availability"
                            value={skill.availability}
                            // onChange={handleChangeSkill}
                            size="25"
                            required
                        />

                        <button
                            // onClick={handlechange.bind(null, skillUpdate)}
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
