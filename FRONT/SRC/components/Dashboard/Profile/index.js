import { React, useState } from "react";
import ProfilePatch from "./ProfilePatch";
import SkillPatch from "./SkillPatch";



export default function ProfilePatch({ loading, setLoading }) {

    const [dataProfile, setDataProfile] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        grade_level: '',
        presentation: '',
        Categories: [],
    });

    const [selectedCategories, setSelectedCategories] = useState([]);


    return (
        <>
            <h2>
                Profil
            </h2>
            <ProfilePatch
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                loading={loading}
                setLoading={setLoading}
                dataProfile={dataProfile}
                setDataProfile={setDataProfile}
            />

            <SkillPatch />
        </>
    )
}