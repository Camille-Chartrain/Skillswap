import { React, useEffect, useState } from "react";
import handleSubmitPatchProfile from "./patchProfile";
import CategoriesCheckboxes from "./CategoriesCheckboxes";
import DataProfile from "./DataProfile";



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


    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleSubmitPatchProfile(dataProfile, selectedCategories);
    };


    return (
        <form method="POST"
            onSubmit={handleSubmit}>

            <legend><h3>Modifier votre profil</h3></legend>

            <DataProfile
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                loading={loading}
                setLoading={setLoading}
                dataProfile={dataProfile}
                setDataProfile={setDataProfile}
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