import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Error from '../error/error';


//=manage reception notification
const CourseStudent = ({ handleNotFoundError, setError, error }) => {

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
                // console.log("response:", response);
                // throw new Error('Failed to fetch courses');
            }

            //=traduct api response in Json
            // console.log("data Course avant .json", response);
            const course = await response.json();
            // console.log(" Course  apres .json:", course);
            setCourses(course);

        }
        catch (error) {
            console.log("catchgetCourse ST:", error);
            setError("Erreur lors de la recuperation des donnees");
            handleNotFoundError("Erreur lors de la recuperation des donnees");
        };
    }
    useEffect(() => { getCourse() }, [])

    return (
        <span className="learningList">
            <h3>Section Apprenant</h3>
            {error && <Error error={error} />}
            <ul>
                {courses?.map((item) => (
                    <>
                        {/* {console.log("qu'est ce que item.title ?:", item.Skill.title)} */}

                        <li className="learning-li" key={item.id}>
                            <span>{item?.Skill?.title}</span>

                            <span className="status" >
                                {item.status === "en attente" && <span className="status-send">DEMANDE ENVOYÉE</span>}
                                {item.status === "refusé" && <span className="status-reject">DEMANDE REJETÉE</span>}
                                {item.status === "en cours" && <span className="status-wait">EN COURS</span>}
                                {item.status === "terminé" && <span className="status-finish">TERMINÉ</span>}
                                { }
                                {item.status !== "en attente" && item.status !== "refusé" && item.status !== "noté" && item.status !== "en cours" && item.status !== "terminé" && <span className="status">STATUT INCONNU</span>}
                            </span>
                        </li>



                    </>
                ))
                }
            </ul >
        </span>


    )

}
export default CourseStudent;