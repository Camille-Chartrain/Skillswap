import { useEffect, useState } from "react";
import Cookies from 'js-cookie';


//=manage reception notification
const CourseTeached = () => {
    const [teacherReq, setTeacherReq] = useState([]);

    const getCourseRequest = async () => {
        try {

            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/teacherLearning', {
                method: "GET",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `,
                },
                body: JSON.stringify(),
                // credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("data CourseRequest avant .json", response);
            const dataRequest = await response.json();
            console.log(" data CourseRequest apres .json:", dataRequest);
            setCourseReq(dataRequest);
            //=fetch back side's  errors
            console.log("error?:", dataRequest.error);
            setError(dataRequest.error);
        }
        catch { }
    }
    useEffect(() => { getCourseRequest() }, [])
    // handleChange = (e) => { e.preventDefault(); setTeacherReq() };


    //= to manage  requests received 
    const patchCourseValidate = async (request) => {
        console.log('skill dans patchCourseValidate: ', request)
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
            const dataRequest = await response.json();
            console.log('dataRequest avant if:', response);
            setTeacherReq(dataRequest);
        }
        catch (error) {
            console.log("catch de patchCourseValidate:", error);
        }
    }


    const patchCourseRejeted = async (request) => {
        console.log('skill dans patchCourseRejeted: ', request)

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
            console.log('dataReject avant if:', response);

            setTeacherReq(dataReject);

        }
        catch (error) {
            console.log("catch de patchCourseRejeted:", error);
        }
    }

    const patchCourseFinished = async (request) => {
        console.log('skill dans patchCourseFinished: ', request)

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
            console.log('dataFinish avant if:', response);

            setTeacherReq(dataFinish);

        }
        catch (error) {
            console.log("catch de patchCourseFinished:", error);
        }
    }

    return (
        <>
            <ul>
                {teacherReq.map((request) => {
                    <li key={request.id}>
                        <h4>cours: {request}</h4>
                        <button onClick={patchCourseValidate.bind(null, request)}>VALIDER LA DEMANDE</button>
                        <button onClick={patchCourseRejeted.bind(null, request)} >REJETER LA DEMANDE</button>
                        <button onClick={patchCourseFinished.bind(null, request)}>COURS TERMINER</button>
                    </li>
                })}
            </ul >

        </>
    )
}
export default CourseTeached;
