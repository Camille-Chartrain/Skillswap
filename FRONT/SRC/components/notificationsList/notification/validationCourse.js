import { useEffect, useState } from "react";


//=manage reception notification
const CourseValidated = () => {
    const [courseReq, setCourseReq] = useState([]);

    const CourseRequest = async () => {
        try {

            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000//acceptLearning/:meetingId', {
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
    useEffect(() => { CourseRequest() }, [])


    return (

        <ul>
            {courseReq.map((request) => {
                <li key={request.id}>
                    <h4>cours: {request.skillId}</h4>
                    <button onClick={CourseValidated.bind{request}}>VALIDER LA DEMANDE</button>
                    <button OnClick={}>REJETER LA DEMANDE</button>
                </li>
}}
        </ul >
    )
}
export default validationCourse;
