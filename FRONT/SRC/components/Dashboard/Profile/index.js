import { React, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import handleSubmitPatchProfile from "./patchProfile";



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
            setLoading(false);

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

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories(prev => {
            if (checked) {
                return [...prev, parseInt(value)];
            } else {
                return prev.filter(id => id !== parseInt(value));
            }
        });
        console.log("selectedCategories", selectedCategories);
    };

    useEffect(() => {
        console.log("dans le use effect de profil");
        getProfile()
    }, []);

    return (
        <form method="POST"
            onSubmit={handleSubmitPatchProfile}>

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

            <p>Centres d'intérêts :</p>
            <label>
                <input
                    type="checkbox"
                    value="1"
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(1)}
                /> Pomme
            </label>
            <label>
                <input
                    type="checkbox"
                    value="2"
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(2)}
                /> Banane
            </label>
            <label>
                <input
                    type="checkbox"
                    value="3"
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(3)}
                /> Cerise
            </label>
            <label>
                <input
                    type="checkbox"
                    value="4"
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(4)}
                /> Date
            </label>
            <label>
                <input
                    type="checkbox"
                    value="5"
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(5)}
                /> Figue
            </label>
            <label>
                <input
                    type="checkbox"
                    value="6"
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(6)}
                /> Autre
            </label>

            <button type="submit">Envoyer</button>
        </form>
    )
}



// export default function Profile({ loading, setLoading }) {

//     const [dataProfile, setDataProfile] = useState({
//         firstname: '',
//         lastname: '',
//         birthday: '',
//         grade_level: '',
//         presentation: '',
//         Categories: [],
//     });

//     const [selectedCategories, setSelectedCategories] = useState([]);

//     async function getProfile() {


//         try {
//             setLoading(true);
//             const token = Cookies.get('token');
//             const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/profile`, {
//                 method: "get",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             // console.log("response avant .json", response);
//             const profileResponse = await response.json();
//             console.log("response apres .json:", profileResponse);
//             setDataProfile(profileResponse);
//             console.log('donnees profile data du state:', dataProfile);
//             setLoading(false);

//             // //= to transform us'date into french's date
//             const dateUs = dataProfile.birthday;
//             const dateObj = new Date(dateUs);
//             const dateFr = dateObj.toLocaleDateString('fr-FR');
//             // console.log("date en francais:", dateFr);
//             console.log('2 donnees profile data du state:', dataProfile);
//         }
//         catch (error) {
//             console.error("error catch:", error.message);
//             // setError("Erreur lors de la recuperation des donnees");
//             // handleNotFoundError("Erreur lors de la recuperation des donnees");
//         }
//     }


//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setDataProfile(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//         console.log("input:", event.target.value);
//     };

//     const handleCheckboxChange = (event) => {
//         const { value, checked } = event.target;
//         setSelectedCategories(prev => {
//             if (checked) {
//                 return [...prev, value];
//             } else {
//                 return prev.filter(categories => categories !== value);
//             }
//         });
//         console.log("selectedCategories", selectedCategories);
//     };


//     useEffect(() => {
//         console.log("dans le use effect de profil");
//         getProfile()
//     }, []);

//     return (
//         <form method="POST"
//             onSubmit={handleSubmitPatchProfile}>


//             <legend><h3>Modifier votre profil</h3></legend>

//             <label htmlFor="firstname">Prénom* :</label>
//             <input
//                 id="firstname"
//                 type="text"
//                 name="firstname"
//                 value={dataProfile.firstname || ""}
//                 size="25"
//                 required
//                 onChange={handleChange}
//             />

//             <label htmlFor="lastname">Nom* :</label>
//             <input
//                 id="lastname"
//                 type="text" name="lastname"
//                 value={dataProfile.lastname || ""}
//                 size="25"
//                 required
//                 onChange={handleChange}
//             />

//             <label htmlFor="birthday">Date de naissance :</label>
//             <input
//                 id="birthday"
//                 type="date"
//                 name="birthday"
//                 value={dataProfile.birthday || ""}
//                 size="25"
//                 onChange={handleChange}
//             />

//             <label htmlFor="grade_level">Niveau d'etude :</label>
//             <input
//                 id="grade_level"
//                 type="text"
//                 name="grade_level"
//                 value={dataProfile.grade_level || ""}
//                 size="25"
//                 onChange={handleChange}
//             />

//             <label htmlFor="presentation">Presentez vous :</label>
//             <textarea
//                 id="presentation"
//                 name="presentation"
//                 value={dataProfile.presentation || ""}
//                 rows="5"
//                 cols="33"
//                 onChange={handleChange}
//             />

//             <p>Centres d'intérêts :</p>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="apple"
//                     onChange={handleCheckboxChange}
//                     checked={dataProfile.Categories.includes(1) || false}
//                 /> Pomme
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="banana"
//                     onChange={handleCheckboxChange}
//                     checked={dataProfile.Categories.includes(2) || false}
//                 /> Banane
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="cherry"
//                     onChange={handleCheckboxChange}
//                     checked={dataProfile.Categories.includes(3) || false}
//                 /> Cerise
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="date"
//                     onChange={handleCheckboxChange}
//                     checked={dataProfile.Categories.includes(4) || false}
//                 /> Date
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="fig"
//                     onChange={handleCheckboxChange}
//                     checked={dataProfile.Categories.includes(5) || false}
//                 /> Figue
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="fig"
//                     onChange={handleCheckboxChange}
//                     checked={dataProfile.Categories.includes(6) || false}
//                 /> Figue
//             </label>

//             <button type="submit">Envoyer</button>
//         </form>
//     )
// }