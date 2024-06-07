import { useState, useEffect } from "react";
import Cookies from 'js-cookie';


//=manage reception notification
const CourseStudent = () => {

    const [courses, setCourses] = useState([]);

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
            })
            console.log('response.status:', response.status);

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            //=traduct api response in Json
            console.log("data Course avant .json", response);
            const course = await response.json();
            console.log(" Course  apres .json:", course);
            setCourses(course);


        }
        catch (error) { "catchgetCourse ST:", error };
    }
    useEffect(() => { getCourse() }, [])

    return (
        <main>
            <ul>
                {courses?.map((item) => (

                    <>
                        {console.log("qu'est ce que item.title ?:", item.title)}
                        <div key={item.id}>
                            <li>
                                <h4>{item.title}</h4>
                            </li>
                        </div>


                        <div className="status" >
                            {item.status === "en attente" && "DEMANDE ENVOYEE"}
                            {item.status === "refusé" && "DEMANDE REJETEE"}
                            {item.status === "en cours" && "EN COURS"}
                            {item.status === "terminé" && "TERMINE"}
                        </div>

                    </>
                ))
                }
            </ul >
        </main >


    )

}
export default CourseStudent;