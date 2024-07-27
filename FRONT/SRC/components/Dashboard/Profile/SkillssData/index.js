import { React, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import CardsSkills from "./CardsSkills";


export default function SkillsData({ loading, setLoading, skills }) {

    // const [skills, setSkills] = useState([]);

    // const GetSkills = async () => {

    //     try {
    //         console.log("dans getsskills()");
    //         setLoading(true)
    //         const token = Cookies.get('token');
    //         const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/skill`, {
    //             method: "get",
    //             status: 200,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //         })
    //         // console.log('response.status:', response.status);
    //         console.log("skillUser avant .json", response);
    //         const dataSkills = await response.json();
    //         console.log(" response apres .json:", dataSkills);
    //         setSkills(dataSkills);
    //         setLoading(false)


    //     }
    //     catch (error) {
    //         console.error(error.message);
    //         // setError("Erreur d'affichage de la liste des competences");
    //         // handleNotFoundError("Erreur d'affichage de la liste des competences");
    //     }
    // }
    // useEffect(() => { GetSkills() }, [])


    return (
        <CardsSkills
            loading={loading}
            skills={skills}
        />
    )
}