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
            // console.log('response.status:', response.status);

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            //=traduct api response in Json
            // console.log("data Course avant .json", response);
            const course = await response.json();
            // console.log(" Course  apres .json:", course);
            setCourses(course);


        }
        catch (error) { console.log("catchgetCourse ST:", error); throw error; };
    }
    useEffect(() => { getCourse() }, [])

    return (
        <main>
            <ul>
                {courses?.map((item) => (
                    <>
                        {/* {console.log("qu'est ce que item.title ?:", item.Skill.title)} */}

                        <li key={item.id}>
                            <h4>{item?.Skill?.title}</h4>

                            <div className="status" >
                                {item.status === "en attente" && <h4>DEMANDE ENVOYEE</h4>}
                                {item.status === "refusé" && <h4>DEMANDE REJETEE</h4>}
                                {item.status === "en cours" && <h4>EN COURS</h4>}
                                {item.status === "terminé" && <h4>TERMINE</h4>}
                                {item.status !== "en attente" && item.status !== "refusé" && item.status !== "en cours" && item.status !== "terminé" && <h4>STATUT INCONNU</h4>}
                            </div>
                        </li>



                    </>
                ))
                }
            </ul >
        </main >


    )

}
export default CourseStudent;