import Skill from "../skillList/skill";
import Cookies from 'js-cookie';





const Profile = ({ handleSubmit, register, skillsList, isValid }) => {

    //=post method to send info
    async function GetProfile() {
        try {

            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // body: JSON.stringify(data),
                credentials: 'include'
            })



            // console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("ICI QUON VEUT LES DATA AUSSI  response avant .json", response);
            const dataProfile = await response.json();
            console.log("ICI QUON VEUT LES DATA response apres .json:", dataProfile);
        }
        catch (error) {
            console.log("erreur :", error);
        }
    }

    GetProfile();

    const GetProfileDelete = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
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
            const dataProfile = await response.json();
            console.log("response apres .json:", dataProfile);

            //=fetch back side's  errors
            console.log("error?:", dataProfile.error);
            setError(dataProfile.error);

            {/* //= manage and show error for user */ }
            if (dataProfile) {
                return (<div className="success"> "Votre profile a ete modifie" </div>)
            }
            else { <div className="error">return({error?.message})</div> }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }
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
            const dataCompetence = await response.json();
            console.log(" response apres .json:", dataCompetence);

            //=fetch back side's  errors
            console.log("error?:", dataCompetence.error);
            setError(dataCompetence.error);

            {/* //= manage and show error for user */ }
            if (dataCompetence) {
                return (<div className="success"> "La competence a ete cree" </div>)
            }
            else { <div className="error">return({error?.message})</div> }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }
    const GetCompUpdate = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`{http://localhost:3000/skill/:${item?.id}}`, {
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
            const dataCompetence = await response.json();
            console.log(" response apres .json:", dataCompetence);

            //=fetch back side's  errors
            console.log("error?:", dataCompetence.error);
            setError(dataCompetence.error);

            {/* //= manage and show error for user */ }
            if (dataCompetence) {
                return (<div className="success"> "La competence a ete cree" </div>)
            }
            else { <div className="error">return({error?.message})</div> }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }
    const GetCompDelete = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/:${item?.id}`, {
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
            const dataCompetence = await response.json();
            console.log(" response apres .json:", dataCompetence);

            //=fetch back side's  errors
            console.log("error?:", dataCompetence.error);
            setError(dataCompetence.error);

            {/* //= manage and show error for user */ }
            if (dataCompetence) {
                return (<div className="success"> "La competence a ete cree" </div>)
            }
            else { <div className="error">return({error?.message})</div> }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }

    //= get metho to show info

    // const GetProfile = async (data) => {
    // try {
    //     console.log('try data:', data);
    //     const token = Cookies.get('token');
    //     const response = await fetch('http://localhost:3000/profile', {
    //         method: "get",
    //         status: 200,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(data),
    //         credentials: 'include'
    //     })
    //     console.log('response.status:', response.status);

    //     //=traduct api response in Json
    //     console.log("response avant .json", response);
    //     const dataProfile = await response.json();
    //     console.log(" response apres .json:", dataProfile);

    //     //=fetch back side's  errors
    //     console.log("error?:", dataProfile.error);
    //     setError(dataProfile.error);

    //     {/* //= manage and show error for user */ }
    //     if (dataProfile) {
    //         return (<div className="success"> "Votre profile a ete modifie" </div>)
    //     }
    //     else { <div className="error">return({error?.message})</div> }
    // }
    //     catch (error) {
    //     console.log("erreur cath :", error);
    // }
    // }
    const CompetenceGet = async (data) => {
        //     try {
        //         console.log('try data:', data);
        //         const token = Cookies.get('token');
        //         const response = await fetch('http://localhost:3000/skill', {
        //             method: "get",
        //             status: 200,
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${token}`,
        //             },
        //             body: JSON.stringify(data),
        //             credentials: 'include'
        //         })
        //         console.log('response.status:', response.status);

        //         //=traduct api response in Json
        //         console.log("response avant .json", response);
        //         const dataCompetence = await response.json();
        //         console.log(" response apres .json:", dataCompetence);

        //         //=fetch back side's  errors
        //         console.log("error?:", dataCompetence.error);
        //         setError(dataCompetence.error);

        //         {/* //= manage and show error for user */ }
        //         if (dataCompetence) {
        //             return (<div className="success"> "La competence a ete cree" </div>)
        //         }
        //         else { <div className="error">return({error?.message})</div> }
        //     }
        //     catch (error) {
        //         console.log("erreur cath :", error);
        //     }
    }


    return (
        <>
            <div className="changeProfile">
                <h2 id="profile">Profil</h2>

                <form method="POST" onSubmit={handleSubmit(GetProfile)} className="profile">

                    <fieldset className="profileChange">
                        <legend><h3>Modifier votre profil</h3></legend>

                        <label htmlFor="firstname">Prénom* :</label>
                        <input type="text" id="firstname" name="firstname" {...register("firstname")} size="25" autoComplete={"firstname"} required />

                        <label htmlFor="lastname ">Nom* :</label>
                        <input type="text" id="lastname" name="lastname"{...register("lastname")} size="25" autoComplete="lastname" required />

                        <label htmlFor="birthday">Date de naissance :</label>
                        <input type="date" id="birthday" name="birthday" {...register("birthday")} size="25" autoComplete="birthday" />

                        <label htmlFor="grade_level">Niveau d'etude :</label>
                        <input type="text" id="grade_level" name="grade_level" {...register("grade_level")} size="25" autoComplete="grade_level" />

                        <label htmlFor="presentation">Presentez vous :</label>
                        <textarea id="presentation" name="presentation" {...register("presentation")} rows="5" cols="33" autoComplete="presentation" />

                        {/* <label htmlFor="email">Email * :</label>
                        <input type="email" id="email" name="email" {...register("email")} size="35" placeholder="  monadresse@gmail.com" autoComplete="password" required /> */}

                        {/* //=section in place for later version 2
                        <>
                            <label htmlFor="password">Modifier mot de passe :</label>
                            <input type="newPassword" id="newPassword" name="newPassword" {...register("newPassword")} size="35" placeholder="  12 caracteres minimun" />
                            <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                            <input type="password" id="confPassword" name="confPassword" {...register("confPassword")} size="35" />
                        </> */}

                        <fieldset className="interest">
                            <legend><h4>Centres d'interets</h4></legend>
                            <div>
                                <input type="checkbox" value="language" id="1" />
                                <label htmlFor="1">Language</label>
                            </div><div>
                                <input type="checkbox" name="name" id="2" {...register("name")} />
                                <label htmlFor="2">Bricolage</label>
                            </div>  <div>
                                <input type="checkbox" name="3" id="3" {...register("id")} />
                                <label htmlFor="3">DIY</label>
                            </div> <div>
                                <input type="checkbox" name="4" id="4" {...register("id")} />
                                <label htmlFor="4">Cuisine</label>
                            </div><div>
                                <input type="checkbox" name="5" id="5"  {...register("id")} />
                                <label htmlFor="5">Art</label>
                            </div> <div>
                                <input type="checkbox" name="6" id="6"  {...register("id")} />
                                <label htmlFor="6">Scolaire</label>
                            </div>
                        </fieldset>
                        <button type="submit" disabled={isValid} >VALIDER</button>
                    </fieldset>
                </form>

                <form method="POST" onSubmit={handleSubmit(GetCompetence)} className="competence">
                    <fieldset className="createComp">
                        <legend><h3>Creation de competence</h3></legend>
                        <div></div>
                        <label htmlFor="title">Titre * :</label>
                        <small> Merci de donner un titre explicite</small>
                        <input type="text" id="title" name="title" {...register("title")} size="25" autoComplete="title" required />

                        <select id="categories" name="categories" value="all">
                            <option value="all" name="category">choisissez votre categorie</option>
                            <option value="1" >Language</option>
                            <option value="2" >Bricolage</option>
                            <option value="3" >Produits DIY</option>
                            <option value="4" >Cuisine</option>
                            <option value="5" >Art</option>
                            <option value="6" >Scolaire</option>
                        </select>

                        <select id="subCategories" name="subCategories" value="all">
                            <option value="all" >choisissez votre sous-categorie</option>

                            <option value="">---------------sous-categorie Language---------------</option>

                            <option value="2" >Grammaire et orthographe</option>
                            <option value="3" >Langage des signes</option>
                            <option value="1" >Langues etrangeres</option>
                            <option value="4" >Linguistique</option>
                            <option value="5" >Redaction creative</option>
                            <option value="6" >Traduction et interpretation</option>

                            <option value="">---------------sous-categorie Bricolage---------------</option>

                            <option value="2" >Electricite domestique</option>
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
                        <input type="text" id="duration" name="duration" {...register("duration")} size="25" autoComplete="duration" required />

                        <label htmlFor="price">Tarif :</label>
                        <input type="price" id="price" name="price" {...register("price")} size="25" autoComplete="price" required />

                        <label htmlFor="level">Niveau * :</label>
                        <select id="level" name="level" required >
                            <option value="e" selected>ajoutez un niveau</option>
                            <option value="debutant" >Debutant</option>
                            <option value="intermidiare" s>Intermediaire</option>
                            <option value="avance" >Avance</option>
                        </select>
                        <label htmlFor="transmission"> Mode de transmission * :</label>
                        <select id="transmission" name="transmission" required >
                            <option value="" selected>mode de transmission</option>
                            <option value="online">En ligne</option>
                            <option value="video">Video</option>
                            <option value="email">Email</option>
                        </select>
                        <label htmlFor="description">Descriptif * :</label>
                        <textarea id="description" name="description" {...register("description")} rows="5" cols="33" autoComplete="description" required />

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

                <div className="skillsList">
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
                                <button onSubmit={handleSubmit(GetCompUpdate)} className="orangeBtn">MODIFIER</button>
                                <button onSubmit={handleSubmit(GetCompDelete)} type="reset" className="redBtn">SUPPRIMER</button>
                            </span>
                        </span>
                    </ul>

                </div>
                <button onSubmit={handleSubmit(GetProfileDelete)} type="reset" className="redBtn" size="30" >SUPPRIMER LE COMPTE</button>
            </div >
        </>
    )

};
export default Profile;