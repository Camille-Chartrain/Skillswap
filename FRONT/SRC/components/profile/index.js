
import { useState, useEffect } from "react";


const Profile = ({ input }) => {


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
        <>
            <h2 id="profile">Profil</h2>
            <div>

                <form method="POST" onSubmit={handleSubmit} className="profile">
                    <fieldset className="profileChange">
                        <legend><h3>Modifier votre profil</h3></legend>
                        <div>
                            <label htmlFor="firstname">Prénom :</label>
                            <input type="text" id="firstname" name="firstname" value={input} size="25" />

                            <label htmlFor="lastname">Nom :</label>
                            <input type="text" id="lastname" name="lastname" value={input} size="25" />

                            <label htmlFor="bday">Date de naissance :</label>
                            <input type="date" id="bday" name="bday" value={input} size="25" />

                            <label htmlFor="grade_level">Niveau d'etude:</label>
                            <input type="text" id="grade_level" name="grade_level" value={input} size="25" />
                        </div>
                        <div>
                            <label htmlFor="presentation">Presentez vous:</label>
                            <textarea id="presentation" name="presentation" value={input} rows="5" cols="33" />

                            <label htmlFor="email">Email :</label>
                            <input type="email" id="email" name="email" value={input} size="35" placeholder="  monadresse@gmail.com" />

                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" id="password" name="password" value={input} size="35" placeholder="  12 caracteres minimun" />

                            <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                            <input type="password" id="confPassword" name="confPassword" value={input} size="35" />
                        </div>
                        <fieldset>
                            <legend><h4>Centres d'interets</h4></legend>
                            <label htmlFor="Language">Language</label>
                            <input type="checkbox" value="Language" />
                            <label htmlFor="bricolage">Bricolage</label>
                            <input type="checkbox" value="Bricolage" />
                            <label htmlFor="DIY">DIY</label>
                            <input type="checkbox" value="DIY" />
                            <label htmlFor="cooking">Cuisine</label>
                            <input type="checkbox" value="Cuisine" />
                            <label htmlFor="art">Art</label>
                            <input type="checkbox" value="Art" />
                            <label htmlFor="school">Scolaire</label>
                            <input type="checkbox" value="Scolaire" />
                        </fieldset>
                        <button type="reset">SUPPRIMER LE COMPTE</button>
                        <button type="submit">VALIDER</button>
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

                        <fieldset>
                            <legend><h4>Ajouter une categorie</h4>  </legend>

                            <input type="text" placeholder="ajouter la categorie" />

                            <button>AJOUTER</button>
                        </fieldset>


                    </fieldset>
                </form>
            </div >
        </>
    )

};
export default Profile;