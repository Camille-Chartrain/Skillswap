import { useState, useEffect } from "react";
import Cookies from 'js-cookie';


//=manage reception notification
const CourseStudent = () => {

    const [course, setCourse] = useState([]);

    const getCourse = async () => {

        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/studentLearning', {
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
            console.log("data Course avant .json", response);
            const course = await response.json();
            console.log(" Course  apres .json:", course);
            setCourse(course);

            //=fetch back side's  errors
            console.log("erreur getCourse:", error);
            setError(course.error);

        }
        catch { }
    }
    useEffect(() => { getCourse() }, [])


    return (
        <ul>
            {course?.map((skill) => {
                <>
                    <li key={skill.id}>
                        <h4>cours: {skill.title}</h4>
                    </li>
                    <div className="status">
                        if(course.status=== "en attente"){"DEMANDE ENVOYEE"};
                        else if(course.status === "refusé"){"DEMANDE REJETEE"};
                        else if(course.status === "en cours"){"EN COURS"};
                        else if (course.status === "terminé"){"TERMINE"};
                    </div>
                </>
            })}
        </ul >



    )

}
export default CourseStudent;