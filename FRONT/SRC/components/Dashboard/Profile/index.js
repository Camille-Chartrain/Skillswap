import { React, useState, useEffect } from "react";
import ProfilePatch from "./ProfilePatch";
import Cookies from 'js-cookie';
import CardsSkills from "./CardsSkills";
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

    const [skills, setSkills] = useState([]);

    const getSkills = async () => {

        try {
            console.log("dans getsskills()");
            setLoading(true)
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/skill`, {
                method: "get",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            // console.log('response.status:', response.status);
            console.log("skillUser avant .json", response);
            const dataSkills = await response.json();
            console.log(" response apres .json:", dataSkills);
            setSkills(dataSkills);
            setLoading(false)


        }
        catch (error) {
            console.error(error.message);
            // setError("Erreur d'affichage de la liste des competences");
            // handleNotFoundError("Erreur d'affichage de la liste des competences");
        }
    }
    useEffect(() => { getSkills() }, [])



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
                getSkills={getSkills}
            />

            <CardsSkills
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
                skills={skills}
                getSkills={getSkills}
            />
        </>
    )
}