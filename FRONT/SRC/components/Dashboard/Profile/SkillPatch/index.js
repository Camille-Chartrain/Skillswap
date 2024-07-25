import { React, useState } from "react";




export default function SkillPatch({ loading, setLoading }) {

    const [dataSkills, setDataSkills] = useState({
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
                Vos compétences
            </h2>
            {/* <ProfilePatch
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                loading={loading}
                setLoading={setLoading}
                dataProfile={dataProfile}
                setDataProfile={setDataProfile} /> */}
        </>
    )
}