import { React, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Profile({ loading, setLoading }) {

    const [dataProfile, setDataProfile] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        grade_level: '',
        presentation: '',
        Categories: [],
    });

    async function getProfile() {


        try {
            setLoading(true);
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/profile`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // console.log("response avant .json", response);
            const profileResponse = await response.json();
            console.log("response apres .json:", profileResponse);
            setDataProfile(profileResponse);
            console.log('donnees profile data du state:', dataProfile);
            setLoading(false);

            // //= to transform us'date into french's date
            const dateUs = dataProfile.birthday;
            const dateObj = new Date(dateUs);
            const dateFr = dateObj.toLocaleDateString('fr-FR');
            // console.log("date en francais:", dateFr);
        }
        catch (error) {
            console.error("error catch:", error.message);
            // setError("Erreur lors de la recuperation des donnees");
            // handleNotFoundError("Erreur lors de la recuperation des donnees");
        }
    }

    async function handleSubmit() {
        console.log("dans le handlesubmit");
    }


    useEffect(() => {
        console.log("dans le use effect de profil");
        getProfile()
    }, []);

    return (
        <form method="POST"
            onSubmit={handleSubmit}>


            <legend><h3>Modifier votre profil</h3></legend>

            <label htmlFor="firstname">Prénom* :</label>
            <input
                id="firstname"
                type="text"
                name="firstname"
                value={dataProfile && dataProfile.firstname}
                size="25"
                required
            />

            <label htmlFor="lastname">Nom* :</label>
            <input
                id="lastname"
                type="text" name="lastname"
                value={dataProfile && dataProfile.lastname}
                size="25"
                required
            />

            <label htmlFor="birthday">Date de naissance :</label>
            <input
                id="birthday"
                type="date"
                name="birthday"
                value={dataProfile && dataProfile.birthday}
                size="25"
            />

            <label htmlFor="grade_level">Niveau d'etude :</label>
            <input
                id="grade_level"
                type="text"
                name="grade_level"
                value={dataProfile && dataProfile.grade_level}
                size="25"
            />

            <label htmlFor="presentation">Presentez vous :</label>
            <textarea
                id="presentation"
                name="presentation"
                value={dataProfile && dataProfile.presentation}
                rows="5"
                cols="33"
            />

            <p>Centres d'intérêts :</p>
            <label>
                <input
                    type="checkbox"
                    value="apple"
                    // onChange={handleCheckboxChange}
                    checked={selectedFruits.includes('apple')}
                /> Pomme
            </label>
            <label>
                <input
                    type="checkbox"
                    value="banana"
                    // onChange={handleCheckboxChange}
                    checked={selectedFruits.includes('banana')}
                /> Banane
            </label>
            <label>
                <input
                    type="checkbox"
                    value="cherry"
                    // onChange={handleCheckboxChange}
                    checked={selectedFruits.includes('cherry')}
                /> Cerise
            </label>
            <label>
                <input
                    type="checkbox"
                    value="date"
                    // onChange={handleCheckboxChange}
                    checked={selectedFruits.includes('date')}
                /> Date
            </label>
            <label>
                <input
                    type="checkbox"
                    value="fig"
                    // onChange={handleCheckboxChange}
                    checked={selectedFruits.includes('fig')}
                /> Figue
            </label>

            <button type="submit">Envoyer</button>
        </form>
    )
}