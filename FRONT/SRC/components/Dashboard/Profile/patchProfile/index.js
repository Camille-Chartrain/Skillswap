import React from "react";
import Cookies from 'js-cookie';

export default async function handleSubmitPatchProfile(event) {

    console.log('envoi formulaire');
    event.preventDefault();

    const myFormData = new FormData(event.target);
    const formDataEncoded = new URLSearchParams(myFormData);
    console.log("formDataEncoded", formDataEncoded);

    try {
        const token = Cookies.get('token');
        const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/profile`, {
            method: 'PATCH',
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formDataEncoded)
            // credentials: 'include',
        })

        // console.log('response.status:', response.status);

        //=traduct api response in Json
        // console.log("response post profile avant .json", response);
        const dataProfile = await response.json();
        console.log(" response apres .json:", dataProfile);

        //=fetch back side's  errors
        // console.log("error?:", dataProfile.error);
        // setError(error);

    }
    catch (error) {
        console.error("catch profilePatch : ", error);
        // setError("Erreur lors de la modification du profil");
        // handleNotFoundError("Erreur lors de la modification du profil");
    }
}