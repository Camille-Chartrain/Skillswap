
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import SearchCategory from '../../search/SearchCategory';
import SearchSubCategory from '../../search/SearchSubCategory';
import SearchLevel from '../../search/SearchLevel';
import SearchTransmission from '../../search/SearchTransmission';


const SkillUpDate = ({ handleSubmit, register, isValid, skillId }) => {


    //= to fetch datas
    const [skillUpdate, setSkillUpDate] = useState({
        id: [],
        level: '',
        duration: '',
        transmission: '',
        description: '',
        availability: '',
        Sub_category: '',
        firstname: '',
        lastname: '',
        email: '',
        grade_level: '',
        presentation: ''
    })

    // //= to refresh the Skill Data state between two changes
    const handleChangeSkill = (e) => {
        const { name, value } = e.target;
        setSkillUpDate((prevSkillUpDate) => ({ ...prevSkillUpDate, [name]: value }));
    }

    const GetSkillUpDate = async () => {

        try {
            console.log('entree try de getSkillUpDate:', skillId);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${skillId}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            console.log("recup donnees de la BDD avant .json", response);
            const dataSkillUpDate = await response.json();

            console.log("recup donnees  .json:", dataSkillUpDate);
            setSkillUpDate(dataSkillUpDate);
            console.log('donnees Skill data du state:', dataSkillUpDate);

        }
        catch (error) {
            console.error("catch de skillUpDate:", error);
        }
    }
    useEffect(() => { GetSkillUpDate() }, [skillId])


    //= to change skill
    const PatchSkillUpdate = async (data, skillId) => {
        console.log(skillId);
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${skillId}`, {
                method: "patch",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                // credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);

            //=fetch back side's  errors
            console.log("retour back erreur:", error);

        }
        catch (error) {
            console.log("catch de patchSkillUpDate:", error);
        }
    }

    //=to delete a skill
    const PostSkillDelete = async (skillId) => {
        try {
            console.log('try data:', skillId);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${skillId}`, {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                // credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);

            //=fetch back side's  errors
            console.log("error?:", dataSkill.error);
            setError(dataSkill.error);
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }

    return (
        <>
            <form method="POST" onSubmit={() => handleSubmit(null, PatchSkillUpdate(skillId))} className="skill">
                <fieldset className="skillUpDate">
                    <legend><h3>Modification de competence</h3></legend>
                    <div></div>
                    <label htmlFor="title">Titre * :</label>
                    <small> Merci de donner un titre explicite</small>
                    <input id="title" type="text" name="title" {...register("title")} value={skillUpdate.title} onChange={handleChangeSkill} size="25" autoComplete="on" required />

                    <label htmlFor="CategoryId">Categorie * :</label>
                    <SearchCategory register={register} />

                    <label htmlFor="SubCategoryId">Sous Categorie * :</label>
                    <SearchSubCategory register={register} />

                    <label htmlFor="duration">Duree * :</label>
                    <input id="duration" type="text" name="duration" {...register("duration")} value={skillUpdate.duration} onChange={handleChangeSkill} size="25" autoComplete="duration" required />

                    <label htmlFor="level">Niveau * :</label>
                    <SearchLevel register={register} />

                    <label htmlFor="transmission"> Mode de transmission * :</label>
                    <SearchTransmission register={register} />

                    <label htmlFor="description">Descriptif * :</label>
                    <textarea id="description" type="text" name="description" {...register("description")} value={skillUpdate.description} onChange={handleChangeSkill} rows="5" cols="33" autoComplete="on" required />

                    <label htmlFor="availability">Disponibilite * :</label>
                    <input id="availability" type="text" name="availability" {...register("availability")} value={skillUpdate.availability} onChange={handleChangeSkill} size="25" autoComplete="on" required />

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
            </form >
        </>
    )
};



export default SkillUpDate;