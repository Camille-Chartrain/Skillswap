import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { link } from "fs";
import { useNavigate } from "react-router-dom";
import Error from '../error/error';


//=manage reception notification
const CourseTeached = ({ handleNotFoundError, error, setError, GetMoney }) => {
    const [teacherReq, setTeacherReq] = useState([]);
    //=redirect for update skill
    const navigate = useNavigate();


    const getCourseTeacher = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/teacherLearning`, {
                method: "GET",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `,
                },

            })
            console.log('response.status:', response.status);
            console.log("response", response);

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            else {
                //=traduct api response in Json
                console.log("data CourseTeacheravant .json", response);
                const dataTeacher = await response.json();
                console.log("dataTeacher.message", dataTeacher.message);
                console.log(" data CourseTeacherapres .json:", dataTeacher);

                setTeacherReq(dataTeacher);
            }
        }
        catch (error) {
            console.log("catch GetCourseReqTeach: ", error);
            setError("Erreur lors de la recuperation des donnees");
            handleNotFoundError("Erreur lors de la recuperation des donnees");
        }
    }


    //= to manage  requests received 
    const patchCourseValidate = async (item) => {
        // console.log('skill dans patchCourseValidate: ', item)
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/acceptLearning/${item.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(item),
            })

            if (response.ok) {

                // console.log("dans le reponse.ok validate");
                // console.log("response", response);
                getCourseTeacher();

            } else {
                throw new Error("Invalid response from API");
            }


        }
        catch (error) {
            console.log("catch de patchCourseValidate:", error);
            setError("Erreur lors de la recuperation des donnees");
            handleNotFoundError("impossible de valider ce cours");
        }
    }

    const patchCourseRejeted = async (item) => {
        // console.log('skill dans patchCourseRejeted: ', item)

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/declineLearning/${item.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(item),
                // credentials: 'include'
            })

            // //=traduct api response in Json
            // console.log('dataReject avant if:', response);
            const dataReject = await response.json();
            // console.log('dataRejeect apres json', dataReject);

            if (dataReject == "meeting declined") {
                // console.log("dans le reponse reject");
                // console.log("response", response);
                getCourseTeacher();
            }
            else {
                throw new Error("Invalid response from API");
            }
        }
        catch (error) {
            console.log("catch de patchCourseRejeted:", error);
            setError("Erreur lors de la recuperation des donnees");
            handleNotFoundError("Impossible de rejeter ce cours");
        }
    }

    const patchCourseFinished = async (item) => {
        // console.log('skill dans patchCourseFinished: ', item)

        try {
            // console.log("fais voir ton... id:", item.id);
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/closeLearning/${item.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(item),
            })

            // //=traduct api response in Json

            const dataFinish = await response.json();
            // console.log('dataFinish avant if:', response);
            // console.log('rep json:', dataFinish);


            if (dataFinish == "meeting closed, swappies handled") {
                // console.log("dans le reponse terminer cours");
                // console.log("response", response);
                getCourseTeacher();
                GetMoney();

            }
            else {
                throw new Error("Invalid response from API");
            }

        }
        catch (error) {
            console.log("catch de patchCourseFinished:", error);
            setError("Impossible de terminer ce cours");
            handleNotFoundError("Impossible de terminer ce cours");
        }
    }

    useEffect(() => { getCourseTeacher() }, [])


    return (
        <span className="learningList">
            <h3>Section Enseignant</h3>
            {
                error && <Error error={error} /> ? Error : (
                    <ul>
                        {teacherReq && teacherReq.length > 0 ?
                            teacherReq?.map((item) => (
                                <>
                                    {/* { console.log("qu'est ce que item.title ?:", item.Skill.title) } */}

                                    <li className="learning-li btn" key={item.id} >
                                        <span> {item.Skill.title}</span>
                                        <span>{item.User.firstname} {item.User.lastname}</span>
                                        <span span className="status btn" >
                                            {
                                                item.status === "en attente" &&
                                                <>
                                                    <button className="blueBtn" onClick={patchCourseValidate.bind(null, item)}>VALIDER LA DEMANDE</button>
                                                    <button className="redBtn" onClick={patchCourseRejeted.bind(null, item)} >REJETER LA DEMANDE</button>
                                                </>
                                            }
                                            {item.status === "refusé" && <span className="status-reject">COURS REFUSÉ</span>}
                                            {item.status === "en cours" && <button className="orangeBtn" onClick={patchCourseFinished.bind(null, item)}>TERMINER LE COURS</button>}
                                            {item.status === "terminé" && <><span className="status-finish" >TERMINÉ </span><span className="status-congrat">Bravo ! Vous gagnez 1 Swappie</span></>}
                                            {/* {item.status === "noté" && <span>TERMINÉ - NOTE REÇUE:{item.Skill.mark-chemin à revoir}</span>} */}
                                            {item.status !== "en attente" && item.status !== "noté" && item.status !== "refusé" && item.status !== "en cours" && item.status !== "terminé" && <span>STATUT INCONNU</ span>}
                                        </span>
                                    </li >
                                </>
                            )) : (
                                <p> Pas de cours en attente </p>
                            )
                        }
                    </ul >
                )
            }
        </span>
    )
}
export default CourseTeached;
