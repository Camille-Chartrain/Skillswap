import { React } from "react";

import CategoriesCheckboxes from "./CategoriesCheckboxes";
import DataProfile from "./DataProfile";
import Cookies from 'js-cookie';



export default function ProfilePatch(
    {
        loading,
        setLoading,
        dataProfile,
        setDataProfile,
        selectedCategories,
        setSelectedCategories
    }
) {


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('envoi formulaire');

        const profileData = {
            ...dataProfile,
            Categories: selectedCategories,
        };
        console.log("profileData", profileData);

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/profile`, {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profileData)
            })

            // console.log('response.status:', response.status);
            // console.log("response post profile avant .json", response);
            const dataProfile = await response.json();
            console.log(" response apres .json:", dataProfile);

            // console.log("error?:", dataProfile.error);
            // setError(error);
        }
        catch (error) {
            console.error("catch profilePatch : ", error);
            // setError("Erreur lors de la modification du profil");
            // handleNotFoundError("Erreur lors de la modification du profil");
        }

    };


    return (
        <form method="POST"
            onSubmit={handleSubmit}>

            {/* legend dans fieldset sert pour l'accessbilité => une légende pour un groupe de chammps */}
            <fieldset>
                <legend>Modifier votre profil</legend>

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
            </fieldset>
        </form>
    )
}