
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import SearchCategory from '../../search/SearchCategory';
import SearchSubCategory from '../../search/SearchSubCategory';
import SearchLevel from '../../search/SearchLevel';
import SearchTransmission from '../../search/SearchTransmission';
import { useLocation, useNavigate } from "react-router-dom";


const SkillUpDate = ({ handleSubmit, register, isValid, setValue, reset }) => {

    const location = useLocation();
    const skill = location.state?.skill;

    // //= to fetch datas
    const [skillUpdate, setSkillUpDate] = useState(skill
        || {
        id: [],
        Category: '',
        SubCategory: '',
        title: '',
        price: '',
        mark: '',
        level: '',
        duration: '',
        transmission: '',
        description: '',
        availability: '',
    }
    );

    // //= to refresh the Skill Data state between two changes
    const handleChangeSkill = (e) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSkillUpDate((prevSkill) => ({
            ...prevSkill,
            [name]: value,
        }));
        setValue(name, value);
    }

    const getSkillUpDate = async () => {
        // console.log('id depuis skill:', skill.id)
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/oneSkill/${skill.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            const res = await response.json();
            setSkillUpDate(res.data);

            //= update inputs' values
            Object.keys(res.data).forEach(key => {
                setValue(key, res.data[key]);
            });
        }
        catch (error) {
            console.error("catch de skillUpDate:", error);
        }
    }
    useEffect(() => { }, [])

    //=redirect for update skill
    const navigate = useNavigate();

    // //=go to skillUpDate component
    const handlechange = () => {
        console.log('HC recup skill:', skill);
    }

    //= to change skill
    const patchSkillUpdate = async (skill) => {
        console.log('skill dans patchSkillUpdate: ', skill)

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${skill.id}`, {
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
        }
    }


    if (!skillUpdate) {
        return <div>Loading....</div>
    }

    return (
        <>
            <form method="POST" onSubmit={handleSubmit(patchSkillUpdate.bind(null, skillUpdate))} className="skill">
                <fieldset className="skillUpDate">
                    <legend><h3>Modification de competence</h3></legend>
                    <div></div>
                    <label htmlFor="title">Titre * :</label>
                    <small> Merci de donner un titre explicite</small>
                    <input id="title" type="text" name="title" defaultValue={skillUpdate.title} {...register("title")} onChange={handleChangeSkill} size="25" required />

                    <label htmlFor="CategoryId">Categorie et Sous -categorie * :</label>
                    <SearchCategory register={register} />

                    {/* <label htmlFor="SubCategoryId">Sous Categorie * :</label>
                    <SearchSubCategory register={register} /> */}

                    <label htmlFor="duration">Duree * :</label>
                    <input id="duration" type="text" name="duration" defaultValue={skillUpdate.duration} {...register("duration")} onChange={handleChangeSkill} size="25" required />

                    <label htmlFor="level">Niveau * :</label>
                    <SearchLevel register={register} />

                    <label htmlFor="transmission"> Mode de transmission * :</label>
                    <SearchTransmission register={register} />

                    <label htmlFor="description">Descriptif * :</label>
                    <textarea id="description" type="text" name="description" {...register("description")} defaultValue={skillUpdate.description} onChange={handleChangeSkill} rows="5" cols="33" required />

                    <label htmlFor="availability">Disponibilite * :</label>
                    <input id="availability" type="text" name="availability" defaultValue={skillUpdate.availability} {...register("availability")} onChange={handleChangeSkill} size="25" required />

                    <button onClick={handlechange.bind(null, skillUpdate)} disabled={isValid} >VALIDER</button>

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