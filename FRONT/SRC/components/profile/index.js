import SkillList from "../skillList";
import { useState, useEffect } from "react";


const Profile = ({ input, skillsList }) => {


    const [profilChange, setProfilChange] = useState('');

    const handleSubmit = (e) => {
        e.eventDefault();
        setProfilChange();
    }

    const GetProfileChange = async () => {
        try {
            const response = await fetch(`http://localhost:3000/profile`);
            const dataRegistration = await response.json();
            setProfilChange(dataProfile)
            console.log(dataProfile);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => { GetProfileChange() }, []);



    return (
        <main>
            <div className="changeProfile">
                <h2 id="profile">Profil</h2>
                <form method="POST" onSubmit={handleSubmit} className="profile">

                    <fieldset className="profileChange">
                        <legend><h3>Modifier votre profil</h3></legend>

                        <label htmlFor="firstname">Prénom :</label>
                        <input type="text" id="firstname" name="firstname" value={input} size="25" />

                        <label htmlFor="lastname">Nom :</label>
                        <input type="text" id="lastname" name="lastname" value={input} size="25" />

                        <label htmlFor="bday">Date de naissance :</label>
                        <input type="date" id="bday" name="bday" value={input} size="25" />

                        <label htmlFor="grade_level">Niveau d'etude:</label>
                        <input type="text" id="grade_level" name="grade_level" value={input} size="25" />

                        <label htmlFor="presentation">Presentez vous:</label>
                        <textarea id="presentation" name="presentation" value={input} rows="5" cols="33" />

                        <label htmlFor="email">Email :</label>
                        <input type="email" id="email" name="email" value={input} size="35" placeholder="  monadresse@gmail.com" />

                        {/* <label htmlFor="password">Modifier mot de passe :</label>
                        <input type="newPassword" id="newPassword" name="newPassword" value={input} size="35" placeholder="  12 caracteres minimun" />

                        <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                        <input type="password" id="confPassword" name="confPassword" value={input} size="35" /> */}

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
                        <button type="submit" >VALIDER</button>
                    </fieldset>

                    <fieldset className="createComp">
                        <legend><h3>Creation de competence</h3></legend>
                        <label htmlFor="title">Titre:</label>
                        <input type="text" id="title" name="title" value={input} size="25" />

                        <label htmlFor="duration">Duree :</label>
                        <input type="text" id="lduration" name="lduration" value={input} size="25" />

                        <label htmlFor="price">Tarif :</label>
                        <input type="price" id="price" name="price" value={input} size="25" />

                        <label htmlFor="level">Niveau :</label>
                        <select id="level" name="level">
                            <option value="e" selected>ajoutez un niveau</option>
                            <option value="debutant" >Debutant</option>
                            <option value="intermidiare" s>Intermediaire</option>
                            <option value="avance" >Avance</option>
                        </select>
                        <label htmlFor="transmission"> Mode de transmission :</label>
                        <select id="transmission" name="transmission">
                            <option value="" selected>mode de transmission</option>
                            <option value="online">En ligne</option>
                            <option value="video">Video</option>
                            <option value="email">Email</option>
                        </select>
                        <label htmlFor="description">Descriptif:</label>
                        <textarea id="description" name="description" value={input} rows="5" cols="33" />

                        <button>VALIDER</button>

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
                            <button className="btn">AJOUTER</button>
                        </fieldset>
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
                                <button className="orangeBtn">MODIFIER</button>
                                <button type="reset" className="redBtn">SUPPRIMER</button>
                            </span>
                        </span>
                    </ul>

                </div>
                <button type="reset" className="redBtn" size="30">SUPPRIMER LE COMPTE</button>
            </div >
        </main>
    )

};
export default Profile;