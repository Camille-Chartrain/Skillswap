
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import SearchCategory from '../search/SearchCategory';
import SearchLevel from '../search/SearchLevel';
import SearchTransmission from '../search/SearchTransmission';


const CreateSkill = ({ handleSubmit, register, isValid, reset, GetAllSkillUser }) => {

    const [createSkill, setDataCreateSkill] = useState({
        id: [],
        title: (''),
        Category: '',
        SubCategory: '',
        duration: (''),
        level: (''),
        price: (''),
        transmission: (''),
        description: (''),
        availability: (''),
        mark: (''),
    });

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectLevel, setSelectLevel] = useState('all');

    //=post method to send info
    const PostCompetence = async (data) => {
        try {

            console.log("selectedCategory dans try", selectedCategory);
            console.log("selectedSubCategory dans try", selectedSubCategory);
            console.log("selectLevel dans try", selectLevel);
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/?&CategoryId=${selectedCategory?.id}&SubCategoryId=${selectedSubCategory?.id}`, {
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
        }
    }


    return (

        <>
            <form method="POST" onSubmit={handleSubmit(PostCompetence)} className="skill">
                <fieldset className="createSkill">
                    <legend><h3>Creation de competence</h3></legend>
                    <span></span>
                    <label htmlFor="title">Titre * :</label>
                    <small> Merci de donner un titre explicite</small>
                    <input id="title" type="text" name="title" {...register("title")} size="25" autoComplete="on" required />

                    <label htmlFor="CategoryId">Categorie et Sous-categorie * :</label>
                    <SearchCategory
                        register={register}
                        handleSubmit={handleSubmit}

                        setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}

                        setSelectedSubCategory={setSelectedSubCategory}
                        selectedSubCategory={selectedSubCategory}
                    />


                    <label htmlFor="duration">Duree * :</label>
                    <input id="duration" type="text" name="duration" {...register("duration")} size="25" autoComplete="duration" required />

                    <label htmlFor="level">Niveau * :</label>
                    <SearchLevel
                        register={register}
                        handleSubmit={handleSubmit}
                        setSelectLevel={setSelectLevel}
                        selectLevel={selectLevel}
                    />

                    <label htmlFor="transmission"> Mode de transmission * :</label>
                    <SearchTransmission register={register} />

                    <label htmlFor="description">Descriptif * :</label>
                    <textarea id="description" name="description" {...register("description")} rows="5" cols="33" autoComplete="on" required />

                    <label htmlFor="availability">Disponibilite * :</label>
                    <input id="availability" type="availability" name="availability" {...register("availability")} size="25" autoComplete="on" required />

                    <button disabled={isValid} >VALIDER</button>

                    {/* //= section in place for later version2
                    <fieldset className="addCategory">
                        <legend><h4>Ajouter categorie/sous-categorie</h4>  </legend>
                        <p>
                            <label htmlFor="addCategory"></label>
                            <input id="addCategory" type="text" placeholder="ajouter la categorie" />
                        </p>
                        <p>
                            <label htmlFor="addSubCategory"></label>
                            <input id="addSubCategory" type="text" placeholder="ajouter la sous-categorie" />
                        </p>
                        <button className="btn" disabled={isValid} >AJOUTER</button>
                    </fieldset> */}

                </fieldset>
            </form>
        </>
    )
}
export default CreateSkill;