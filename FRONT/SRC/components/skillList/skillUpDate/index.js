
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import SearchCategory from '../../search/SearchCategory';
import SearchSubCategory from '../../search/SearchSubCategory';
import SearchLevel from '../../search/SearchLevel';
import SearchTransmission from '../../search/SearchTransmission';
import { useLocation, useNavigate, useParams } from "react-router-dom";


const SkillUpDate = ({ handleSubmit, register, isValid }) => {
    const { id } = useParams();
    const location = useLocation();
    const skill = location.state?.skillData;

    // //= to fetch datas
    const [skillUpdate, setSkillUpDate] = useState(skill || {
        id: [],
        Category: '',
        Sub_category: '',
        title: '',
        price: '',
        mark: '',
        level: '',
        duration: '',
        transmission: '',
        description: '',
        availability: '',
    });

    // //= to refresh the Skill Data state between two changes
    const handleChangeSkill = (e) => {
        const { name, value } = e.target;
        setSkillUpDate((prevSkillUpDate) => ({ ...prevSkillUpDate, [name]: value }));
    }

    const GetSkillUpDate = async () => {
        console.log('id recup ds GetSkillUpDate avt try:', id);
        try {
            console.log('entree try de getSkillUpDate:', skillUpdate);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/oneSkill/${skill.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(),
                // credentials: 'include'
            });

            console.log("recup donnees de la BDD avant .json", response);
            const dataSkillUpDate = await response.json();

            console.log("donnees getSkillUpDate apres .json:", skill);
            setSkillUpDate(dataSkillUpDate);
            console.log('donnees dataSkillUpDate:', dataSkillUpDate);

        }
        catch (error) {
            console.error("catch de skillUpDate:", error);
        }
    }
    useEffect(() => { GetSkillUpDate() }, [])

    //=redirect for update skill
    const navigate = useNavigate();

    //=go to skillUpDate component
    const handlechange = () => {

        const skillData = {
            id: skill.id,
            Category: skill.Category,
            title: skill.title,
            price: skill.price,
            mark: skill.mark,
            level: skill.level,
            duration: skill.duration,
            transmission: skill.transmission,
            description: skill.descriptions,
            availability: skill.availability,
            Sub_category: skill.Sub_category,
        }
        console.log('HC recup id:', skillData);
        // navigate('/dashboard')
    }
    //= to change skill
    const PatchSkillUpdate = async (data) => {
        console.log("donnees skill ds PAtch avant try :", skill);
        console.log("donnees skill.id ds PAtch avant try :", skill.id);
        try {
            console.log('try de PatchSkillUpDa:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${skill.id}`, {
                method: "PATCH",
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
            console.log("response dataSkill ds Patch avant .json", response);
            const dataSkill = await response.json();
            console.log(" response dataSkill ds Patch apres .json:", dataSkill);

            //=fetch back side's  errors
            // console.log("retour back erreur:", error);

        }
        catch (error) {
            console.log("catch de patchSkillUpDate:", error);
        }
    }
    useEffect(() => { PatchSkillUpdate() }, [skill]);

    //=to delete a skill
    const PostSkillDelete = async () => {
        try {
            console.log('try data:', skill);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${id}`, {
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
            <form method="POST" onSubmit={handleSubmit(PatchSkillUpdate.bind(null, skill.id))} className="skill">
                <fieldset className="skillUpDate">
                    <legend><h3>Modification de competence</h3></legend>
                    <div></div>
                    <label htmlFor="title">Titre * :</label>
                    <small> Merci de donner un titre explicite</small>
                    <input id="title" type="text" name="title" defaultValue={skill.title} {...register("title")} onChange={handleChangeSkill} size="25" required />

                    <label htmlFor="CategoryId">Categorie * :</label>
                    <SearchCategory register={register} />

                    <label htmlFor="SubCategoryId">Sous Categorie * :</label>
                    <SearchSubCategory register={register} />

                    <label htmlFor="duration">Duree * :</label>
                    <input id="duration" type="text" name="duration" defaultValue={skill.duration} {...register("duration")} onChange={handleChangeSkill} size="25" required />

                    <label htmlFor="level">Niveau * :</label>
                    <SearchLevel register={register} />

                    <label htmlFor="transmission"> Mode de transmission * :</label>
                    <SearchTransmission register={register} />

                    <label htmlFor="description">Descriptif * :</label>
                    <textarea id="description" type="text" name="description" {...register("description")} defaultValue={skill.description} onChange={handleChangeSkill} rows="5" cols="33" required />

                    <label htmlFor="availability">Disponibilite * :</label>
                    <input id="availability" type="text" name="availability" defaultValue={skill.availability} {...register("availability")} onChange={handleChangeSkill} size="25" required />

                    <button onClick={handlechange} disabled={isValid} >VALIDER</button>

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