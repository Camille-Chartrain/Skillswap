import SkillList from "../skillList";
import Skill from "../skillList/skill";




const Profile = ({ handleSubmit, register, isValid, skillsList }) => {


    const GetProfileChange = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
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
            const dataProfile = await response.json();
            console.log(" response apres .json:", dataProfile);

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
            console.log(" response apres .json:", dataProfile);

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


    return (
        <>
            <div className="changeProfile">
                <h2 id="profile">Profil</h2>

                <form method="POST" onSubmit={handleSubmit(GetProfileChange)} className="profile">

                    <fieldset className="profileChange">
                        <legend><h3>Modifier votre profil</h3></legend>

                        <label htmlFor="firstname">Prénom* :</label>
                        <input type="text" id="firstname" name="firstname" {...register("firstname")} size="25" required />

                        <label htmlFor="lastname ">Nom* :</label>
                        <input type="text" id="lastname" name="lastname"{...register("lastname")} size="25" required />

                        <label htmlFor="birthday">Date de naissance :</label>
                        <input type="date" id="birthday" name="birthday" {...register("birthday")} size="25" />

                        <label htmlFor="grade_level">Niveau d'etude :</label>
                        <input type="text" id="grade_level" name="grade_level" {...register("grade_level")} size="25" />

                        <label htmlFor="presentation">Presentez vous :</label>
                        <textarea id="presentation" name="presentation" {...register("presentation")} rows="5" cols="33" />

                        {/* <label htmlFor="email">Email * :</label>
                        <input type="email" id="email" name="email" {...register("email")} size="35" placeholder="  monadresse@gmail.com" required /> */}

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
                                <input type="checkbox" value="Language" id="Language" />
                                <label htmlFor="Language">Language</label>
                            </div><div>
                                <input type="checkbox" value="Bricolage" id="Bricolage" />
                                <label htmlFor="bricolage">Bricolage</label>
                            </div>  <div>
                                <input type="checkbox" value="DIY" id="DIY" />
                                <label htmlFor="DIY">DIY</label>
                            </div> <div>
                                <input type="checkbox" value="Cuisine" id="cooking" />
                                <label htmlFor="cooking">Cuisine</label>
                            </div><div>
                                <input type="checkbox" value="Art" id="art" />
                                <label htmlFor="art">Art</label>
                            </div> <div>
                                <input type="checkbox" value="Scolaire" id="school" />
                                <label htmlFor="school">Scolaire</label>
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
                        <input type="text" id="title" name="title" {...register("title")} size="25" required />

                        <select id="categories" name="categories" value="all">
                            <option value="all" name="category">choisissez votre categorie</option>
                            <option value="1" >Language</option>
                            <option value="2" >Bricolage</option>
                            <option value="3" >Produits DIY</option>
                            <option value="4" >Cuisine</option>
                            <option value="5" >Art</option>
                            <option value="6" >Scolaire</option>
                        </select>

                        <label htmlFor="duration">Duree * :</label>
                        <input type="text" id="duration" name="duration" {...register("duration")} size="25" required />

                        <label htmlFor="price">Tarif :</label>
                        <input type="price" id="price" name="price" {...register("price")} size="25" required />

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
                        <textarea id="description" name="description" {...register("description")} rows="5" cols="33" required />

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