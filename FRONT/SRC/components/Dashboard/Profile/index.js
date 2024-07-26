import { React, useState } from "react";
import ProfilePatch from "./ProfilePatch";
import SkillPatch from "./SkillssData";
import CreateSkill from "./CreateSkill";



export default function Profile(
    {
        loading,
        setLoading,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedLevel,
        setSelectedLevel,
        optionsHTML,
        setOptionsHTML
    }
) {

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

            <CreateSkill
                loading={loading}
                setLoading={setLoading}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                optionsHTML={optionsHTML}
                setOptionsHTML={setOptionsHTML}
            />

            <SkillPatch
                loading={loading}
                setLoading={setLoading}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                optionsHTML={optionsHTML}
                setOptionsHTML={setOptionsHTML}
            />
        </>
    )
}