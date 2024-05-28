import { useEffect, useState } from "react";
import Skill from "../../skillList/skill";
import Cookies from 'js-cookie';



const CreateSkill = ({ handleSubmit, register, skillsList, isValid }) => {


    //= to fetch select's datas
    const [selectCat, setSelectCat] = useState('');
    const handleChangeCat = (e) => { setSelectCat(e.target.value) };
    const [selectSubCat, setSelectSubCat] = useState('');
    const handleChangeSubCat = (e) => { setSelectSubCat(e.target.value) };
    const [selectLevel, setSelectLevel] = useState('');
    const handleChangeLevel = (e) => { setSelectLevel(e.target.value) };
    const [selectTrans, setSelectTrans] = useState('');
    const handleChangeTransm = (e) => { setSelectTrans(e.target.value) };

    //=post method to send info

    const GetCompetence = async (data) => {
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
                body: JSON.stringify(data),
                credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataInterest = await response.json();
            console.log(" response apres .json:", dataInterest);

            //=fetch back side's  errors
            console.log("error?:", dataInterest.error);
            setError(dataInterest.error);

            {/* //= manage and show error for user */ }
            if (dataInterest.error) {
                return <div className="error">{dataInterest.error.message}</div>;
            } else {
                return <div className="success">Votre profile a été modifié</div>;
            }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }
    const GetCompUpdate = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${id}`, {
                method: "patch",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataInterest = await response.json();
            console.log(" response apres .json:", dataInterest);

            //=fetch back side's  errors
            console.log("error?:", dataInterest.error);
            setError(dataInterest.error);

            {/* //= manage and show error for user */ }
            if (dataInterest.error) {
                return <div className="error">{dataInterest.error.message}</div>;
            } else {
                return <div className="success">Votre profile a été modifié</div>;
            }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }
    const GetCompDelete = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${id}`, {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataInterest = await response.json();
            console.log(" response apres .json:", dataInterest);

            //=fetch back side's  errors
            console.log("error?:", dataInterest.error);
            setError(dataInterest.error);

            {/* //= manage and show error for user */ }
            if (dataInterest.error) {
                return <div className="error">{dataInterest.error.message}</div>;
            } else {
                return <div className="success">Votre profile a été modifié</div>;
            }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }

    return (

        <>
            {/* <form method="POST" onSubmit={handleSubmit(GetCompetence)} className="competence">
                <fieldset className="createComp">
                    <legend><h3>Creation de competence</h3></legend>
                    <div></div>
                    <label htmlFor="title">Titre * :</label>
                    <small> Merci de donner un titre explicite</small>
                    <input id="title" type="text" name="title" {...register("title")} size="25" autoComplete="on" required />

                    <select name="categories" value={selectCat} onChange={handleChangeCat}>
                        <option value="all" name="category">choisissez votre categorie</option>
                        <option value="1" >Language</option>
                        <option value="2" >Bricolage</option>
                        <option value="3" >Produits DIY</option>
                        <option value="4" >Cuisine</option>
                        <option value="5" >Art</option>
                        <option value="6" >Scolaire</option>
                    </select>

                    <select name="subCategories" value={selectSubCat} onChange={handleChangeSubCat}>
                        <option value="all" >choisissez votre sous-categorie</option>

                        <option value="">---------------sous-categorie Language---------------</option>

                        <option value="2" >Grammaire et orthographe</option>
                        <option value="3" >Langage des signes</option>
                        <option value="1" >Langues etrangeres</option>
                        <option value="4" >Linguistique</option>
                        <option value="5" >Redaction creative</option>
                        <option value="6" >Traduction et interpretation</option>

                        <option value="">---------------sous-categorie Bricolage---------------</option>

                        <option value="8" >Electricite domestique</option>
                        <option value="11">Jardinage</option>
                        <option value="7" >Menuiserie</option>
                        <option value="10">Peinture et decoration intérieure</option>
                        <option value="9">Plomberie</option>
                        <option value="12">Reparation appareils electroniques</option>

                        <option value="">---------------sous-categorie DIY---------------</option>
                        <option value="18" >Artisanat ecologique (produits maison...)</option>
                        <option value="15" >Construction de modeles réduits</option>
                        <option value="14" >Couture et artisanat textile</option>
                        <option value="16" >Creation de bijoux</option>
                        <option value="13" >Fabrication de meubles</option>
                        <option value="17" >Produits de beaute maison</option>

                        <option value="">--------------- sous-categorie Cuisine---------------</option>
                        <option value="20" >Patisserie et desserts</option>
                        <option value="23">Rapide et pratique</option>
                        <option value="24">Regimes specifiques (sans gluten, etc.)</option>
                        <option value="19" >Regionale (italienne, etc.)</option>
                        <option value="22" >Techniques de decoupe et de preparation</option>
                        <option value="21">Vegetalien ou vegetarien</option>

                        <option value="">--------------- sous-categorie Art---------------</option>
                        <option value="28" >Art numérique</option>
                        <option value="29" >Artisanat traditionnel (poterie, tissage, etc.)</option>
                        <option value="30" >Histoire  et appreciation artistique</option>
                        <option value="25">Dessin et peinture</option>
                        <option value="27" >Photographie</option>
                        <option value="26" >Sculpture</option>

                        <option value="">--------------- sous-categorie Scolaire ---------------</option>
                        <option value="33">Histoire et geographie</option>
                        <option value="34">Litterature et analyse de texte</option>
                        <option value="31">Mathematiques</option>
                        <option value="36">Methodes de travail et organisation scolaire </option>
                        <option value="35" >Preparation aux examens (SAT, ACT, BAC, etc.)</option >
                        <option value="32">Sciences (physique, chimie, biologie)</option>

                    </select >

                    <label htmlFor="duration">Duree * :</label>
                    <input id="duration" type="text" name="duration" {...register("duration")} size="25" autoComplete="duration" required />

                    <label htmlFor="price">Tarif :</label>
                    <input id="price" type="price" name="price" {...register("price")} size="25" autoComplete="on" required />

                    <label htmlFor="level">Niveau * :</label>
                    <select name="level" value={selectLevel} required onChange={handleChangeLevel}>
                        <option value="all" >ajoutez un niveau</option>
                        <option value="debutant" >Debutant</option>
                        <option value="intermidiare" >Intermediaire</option>
                        <option value="avance" >Avance</option>
                    </select>
                    <label htmlFor="transmission"> Mode de transmission * :</label>
                    <select name="transmission" value={selectTrans} onChange={handleChangeTransm} required >
                        <option value="all" >mode de transmission</option>
                        <option value="online">En ligne</option>
                        <option value="video">Video</option>
                        <option value="email">Email</option>
                    </select>
                    <label htmlFor="description">Descriptif * :</label>
                    <textarea id="description" name="description" {...register("description")} rows="5" cols="33" autoComplete="on" required />

                    <button disabled={isValid} >VALIDER</button>

                 //= section in place for later version2
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
                    </fieldset>

                </fieldset>
            </form> */}
            < div className="skillsList" >

                <h3>Liste des competences</h3>
                <ul>
                    <span>
                        <li>
                            {skillsList?.map((item) => (
                                < Skill
                                    key={item?.id}
                                    title={item?.title}
                                />
                            ))
                            }
                            test de visuel
                        </li>
                        <span className="btn">
                            {/* <button onSubmit={handleSubmit(GetCompUpdate)} className="orangeBtn">MODIFIER</button>
                            <button onSubmit={handleSubmit(GetCompDelete)} type="reset" className="redBtn">SUPPRIMER</button> */}
                        </span>
                    </span>
                </ul>

                {/* <button onSubmit={handleSubmit(GetProfileDelete)} type="reset" className="redBtn" size="30" >SUPPRIMER LE COMPTE</button> */}
            </div >
        </>
    )
}
export default CreateSkill;