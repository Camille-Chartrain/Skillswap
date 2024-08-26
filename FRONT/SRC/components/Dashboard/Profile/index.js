import { React, useState, useEffect } from "react";
import ProfilePatch from "./ProfilePatch";
import Cookies from 'js-cookie';
import CardsSkills from "./CardsSkills";
import CreateSkill from "./CreateSkill";
import "./style.scss";
import { Helmet } from 'react-helmet';


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
            const response = await fetch(`https://${process.env.REACT_APP_API_URL}/skill`, {
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
            <Helmet>
                <meta name="description" content="Page de gestion de profil utilisateur du site skillswap. Modification des données utilisateurs et de leurs compétences." />
                <title>Profil - Skillswap</title>
            </Helmet>

            <main className="profile">
                <div className="profile_skill">
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
                </div>
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
            </main>
        </>
    )
}
