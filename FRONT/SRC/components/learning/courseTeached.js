import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { link } from "fs";
import { useNavigate } from "react-router-dom";
import Error from '../error/error';


//=manage reception notification
const CourseTeached = () => {
    const [teacherReq, setTeacherReq] = useState([]);
    //=redirect for update skill
    const navigate = useNavigate();


    const getCourseTeacher = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/teacherLearning', {
                method: "GET",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `,
                },

            })
            // console.log('response.status:', response.status);
            // console.log("response", response);

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            else {
                navigate("/dashboard");
            }

            //=traduct api response in Json
            // console.log("data CourseTeacheravant .json", response);
            const dataTeacher = await response.json();
            // console.log(" data CourseTeacherapres .json:", dataTeacher);
            setTeacherReq(dataTeacher);


        }
        catch (error) {
            // console.log("catch GetCourseReqTeach: ", error)
            // throw error;
        }
    }


    //= to manage  requests received 
    const patchCourseValidate = async (item) => {
        // console.log('skill dans patchCourseValidate: ', item)
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/acceptLearning/${item.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(item),
                // credentials: 'include'
            })

            if (response.ok) {

                console.log("dans le reponse.ok validate");
                console.log("response", response);
                getCourseTeacher();

                // navigate("/dashboard");
            } else {
                // throw new Error("Invalid response from API");
                return (
                    <Error />
                )

            }

            // // //=traduct api response in Json
            // const dataTeacher = await response.json();
            // // console.log('dataItem avant if:', dataTeacher);

            // setTeacherReq(dataTeacher);
            // if (dataTeacher === "meeting accepted") {
            //     navigate("/dashboard");
            // }

        }
        catch (error) {
            console.log("catch de patchCourseValidate:", error);
        }
    }

    const patchCourseRejeted = async (item) => {
        // console.log('skill dans patchCourseRejeted: ', item)

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/declineLearning/${item.id}`, {
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
            console.log('dataReject avant if:', response);
            const dataReject = await response.json();
            console.log('dataRejeect apres json', dataReject);

            if (dataReject == "meeting declined") {
                console.log("dans le reponse reject");
                console.log("response", response);
                getCourseTeacher();
            }
            else {
                // throw new Error("Invalid response from API");
                return (
                    <Error />
                )

            }

        }
        catch (error) {
            console.log("catch de patchCourseRejeted:", error);
        }
    }

    const patchCourseFinished = async (item) => {
        // console.log('skill dans patchCourseFinished: ', item)

        try {
            // console.log("fais voir ton... id:", item.id);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/closeLearning/${item.id}`, {
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

            const dataFinish = await response.json();
            console.log('dataFinish avant if:', response);
            console.log('rep json:', dataFinish);


            if (dataFinish == "meeting closed, swappies handled") {
                console.log("dans le reponse terminer cours");
                console.log("response", response);
                getCourseTeacher();

            }
            else {
                // throw new Error("Invalid response from API");
                return (
                    <Error />
                )
            }

        }
        catch (error) {
            // console.log("catch de patchCourseFinished:", error);
        }
    }

    useEffect(() => { getCourseTeacher() }, [])


    return (
        <>
            <ul>
                {console.log("teacherReq dans jsx", teacherReq)}
                {teacherReq && teacherReq.length > 0 ?

                    teacherReq?.map((item) => (
                        <>
                            {/* { console.log("qu'est ce que item.title ?:", item.Skill.title) } */}

                            <li key={item.id} >
                                <h5> {item.Skill.title}</h5>
                                <h5>{item.User.firstname} {item.User.lastname}</h5>
                                <div className="status" >
                                    {item.status === "en attente" &&
                                        <>
                                            <button onClick={patchCourseValidate.bind(null, item)}>VALIDER LA DEMANDE</button>
                                            <button onClick={patchCourseRejeted.bind(null, item)} >REJETER LA DEMANDE</button>
                                        </>
                                    }
                                    {item.status === "refusé" && <h5>COURS REFUSÉ</h5>}
                                    {item.status === "en cours" && <button onClick={patchCourseFinished.bind(null, item)}>TERMINER LE COURS</button>}
                                    {item.status === "terminé" && <h5>COURS TERMINÉ</h5>}
                                    {/* {item.status === "noté" && <h5>TERMINÉ - NOTE REÇUE:{item.Skill.mark-chemin à revoir}</h5>} */}
                                    {item.status !== "en attente" && item.status !== "noté" && item.status !== "refusé" && item.status !== "en cours" && item.status !== "terminé" && <h5>STATUT INCONNU</h5>}
                                </div>
                            </li>
                        </>
                    )) : (
                        <p> Pas de cours en attente </p>
                    )
                }
            </ul >

        </>
    )
}
export default CourseTeached;
