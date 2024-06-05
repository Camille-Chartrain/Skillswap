
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import SearchCategory from '../search/SearchCategory';
import SearchSubCategory from '../search/SearchSubCategory';
import SearchLevel from '../search/SearchLevel';
import SearchTransmission from '../search/SearchTransmission';


const CreateSkill = ({ handleSubmit, register, isValid }) => {

    const [createSkill, setDataCreateSkill] = useState({
        id: [],
        title: (''),
        Category: (''),
        SubCategory: (''),
        duration: (''),
        level: (''),
        price: (''),
        transmission: (''),
        description: (''),
        availability: (''),
        mark: (''),
    });


    const GetCreateSkill = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/skill', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            console.log("ICI QUON VEUT LES DATA AUSSI  response avant .json", response);
            const dataCreateSkill = await response.json();
            console.log("ICI QUON VEUT LES DATA response apres .json:", dataCreateSkill);
            setDataCreateSkill(dataCreateSkill);
            console.log('donnees profile data du state:', dataCreateSkill);

        }
        catch (error) {
            console.error("error catch:", error.message);
        }
    }

    useEffect(() => { GetCreateSkill() }, [])


    //=post method to send info
    const PostCompetence = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/skill', {
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
            // console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);


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
                    <div></div>
                    <label htmlFor="title">Titre * :</label>
                    <small> Merci de donner un titre explicite</small>
                    <input id="title" type="text" name="title" {...register("title")} size="25" autoComplete="on" required />

                    <label htmlFor="CategoryId">Categorie * :</label>
                    <SearchCategory register={register} />

                    <label htmlFor="SubCategoryId">Sous Categorie * :</label>
                    <SearchSubCategory register={register} />

                    <label htmlFor="duration">Duree * :</label>
                    <input id="duration" type="text" name="duration" {...register("duration")} size="25" autoComplete="duration" required />

                    <label htmlFor="level">Niveau * :</label>
                    <SearchLevel register={register} />

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