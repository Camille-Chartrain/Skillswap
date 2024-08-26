import { React, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function DataProfile({
    setLoading,
    dataProfile,
    setDataProfile,
    setSelectedCategories }) {

    const navigate = useNavigate();

    async function getProfile() {

        try {
            setLoading(true);
            const token = Cookies.get('token');
            const response = await fetch(`https://${process.env.REACT_APP_API_URL}/profile`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const profileResponse = await response.json();
            console.log("response apres .json:", profileResponse);
            console.log('profileResponse.error ', profileResponse.error);


            if (profileResponse.error === 'Token invalide') {
                console.log('dans le profileresponse.error');

                navigate("/");
            }
            else {
                const categoryIds = profileResponse.Categories.map(category => category.id);

                setDataProfile(profileResponse);
                setSelectedCategories(categoryIds);

                console.log('donnees profile data du state:', dataProfile);
            }


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



    useEffect(() => {
        console.log("dans le use effect de DataProfile");
        getProfile()
    }, []);

    return (

        <>
            <label htmlFor="firstname">Prénom * :</label>
            <input
                id="firstname"
                type="text"
                name="firstname"
                value={dataProfile.firstname || ""}
                size="25"
                required
                onChange={handleChange}
            />

            <label htmlFor="lastname">Nom * :</label>
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

            <label htmlFor="grade_level">Niveau d'étude :</label>
            <input
                id="grade_level"
                type="text"
                name="grade_level"
                value={dataProfile.grade_level || ""}
                size="25"
                onChange={handleChange}
            />

            <label htmlFor="presentation">Présentez-vous :</label>
            <textarea
                id="presentation"
                name="presentation"
                value={dataProfile.presentation || ""}
                rows="5"
                cols="33"
                onChange={handleChange}
            />

        </>
    )
}
