import { React, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import handleSubmitPatchProfile from "./patchProfile";
import CategoriesCheckboxes from "./CategoriesCheckboxes";



export default function Profile({ loading, setLoading }) {

    const [dataProfile, setDataProfile] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        grade_level: '',
        presentation: '',
        Categories: [],
    });

    const [selectedCategories, setSelectedCategories] = useState([]);

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

            const profileResponse = await response.json();
            console.log("response apres .json:", profileResponse);

            const categoryIds = profileResponse.Categories.map(category => category.id);

            setDataProfile(profileResponse);
            setSelectedCategories(categoryIds);

            console.log('donnees profile data du state:', dataProfile);

        } catch (error) {
            console.error("error catch:", error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataProfile(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log("input:", event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleSubmitPatchProfile(dataProfile, selectedCategories);
    };


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
                value={dataProfile.firstname || ""}
                size="25"
                required
                onChange={handleChange}
            />

            <label htmlFor="lastname">Nom* :</label>
            <input
                id="lastname"
                type="text"
                name="lastname"
                value={dataProfile.lastname || ""}
                size="25"
                required
                onChange={handleChange}
            />

            <label htmlFor="birthday">Date de naissance :</label>
            <input
                id="birthday"
                type="date"
                name="birthday"
                value={dataProfile.birthday || ""}
                size="25"
                onChange={handleChange}
            />

            <label htmlFor="grade_level">Niveau d'etude :</label>
            <input
                id="grade_level"
                type="text"
                name="grade_level"
                value={dataProfile.grade_level || ""}
                size="25"
                onChange={handleChange}
            />

            <label htmlFor="presentation">Presentez vous :</label>
            <textarea
                id="presentation"
                name="presentation"
                value={dataProfile.presentation || ""}
                rows="5"
                cols="33"
                onChange={handleChange}
            />


            <CategoriesCheckboxes
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                loading={loading}
                setLoading={setLoading}
            />
            {loading && <p>chargement...</p>}

            <button type="submit">Envoyer</button>
        </form>
    )
}