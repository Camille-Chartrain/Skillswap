import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { link } from "fs";


//=manage reception notification
const CourseTeached = () => {
    const [teacherReq, setTeacherReq] = useState([]);

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
            console.log('response.status:', response.status);

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            //=traduct api response in Json
            console.log("data CourseTeacheravant .json", response);
            const dataTeacher = await response.json();
            console.log(" data CourseTeacherapres .json:", dataTeacher);
            setTeacherReq(dataTeacher);


        }
        catch (error) {
            console.log("catch GetCourseReqTeach: ", error)
            throw error;
        }
    }
    useEffect(() => { getCourseTeacher() }, [])


    //= to manage  requests received 
    const patchCourseValidate = async (request) => {
        // console.log('skill dans patchCourseValidate: ', request)
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/acceptLearning/${request.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(request),
                // credentials: 'include'
            })

            // //=traduct api response in Json
            const dataTeacher = await response.json();
            // console.log('dataRequest avant if:', response);
            setTeacherReq(dataRequest);
        }
        catch (error) {
            console.log("catch de patchCourseValidate:", error);
        }
    }

    const patchCourseRejeted = async (request) => {
        // console.log('skill dans patchCourseRejeted: ', request)

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/declineLearning/${request.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(request),
                // credentials: 'include'
            })

            // //=traduct api response in Json

            const dataReject = await response.json();
            // console.log('dataReject avant if:', response);

            setTeacherReq(dataReject);

        }
        catch (error) {
            console.log("catch de patchCourseRejeted:", error);
        }
    }

    const patchCourseFinished = async (request) => {
        // console.log('skill dans patchCourseFinished: ', request)

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/closeLearning/${request.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(request),
                // credentials: 'include'
            })

            // //=traduct api response in Json

            const dataFinish = await response.json();
            // console.log('dataFinish avant if:', response);

            setTeacherReq(dataFinish);

        }
        catch (error) {
            // console.log("catch de patchCourseFinished:", error);
        }
    }

    return (
        <>
            <ul>
                {teacherReq.map((item) => (
                    <>
                        {/* { console.log("qu'est ce que item.title ?:", item.Skill.title) } */}

                        <li li key={item.id} >
                            <h4> {item.Skill.title}</h4>
                            <div className="status" >
                                {item.status === "en attente" && <button onClick={patchCourseValidate.bind(null, item)}>VALIDER LA DEMANDE
                                </button> && <button onClick={patchCourseRejeted.bind(null, item)} >REJETER LA DEMANDE</button>}
                                {item.status === "refusé" && <h4>COURS REFUSE</h4>}
                                {item.status === "en cours" && <button onClick={patchCourseFinished.bind(null, item)}>TERMINER LE COURS</button>}
                                {item.status === "terminé" && <h4>COURS TERMINE</h4>}
                                {item.status !== "en attente" && item.status !== "refusé" && item.status !== "en cours" && <h4>STATUT INCONNU</h4>}
                            </div>
                        </li>
                    </>
                ))};
            </ul >

        </>
    )
}
export default CourseTeached;
{/* <button onClick={patchCourseValidate.bind(null, request)}>VALIDER LA DEMANDE</button>
                            <button onClick={patchCourseRejeted.bind(null, request)} >REJETER LA DEMANDE</button>
                            <button onClick={patchCourseFinished.bind(null, request)}>COURS TERMINER</button>
                        </li> */}