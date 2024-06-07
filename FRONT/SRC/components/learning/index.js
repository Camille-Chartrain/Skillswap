import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import CourseStudent from "./courseStudent";
import CourseTeached from "./courseTeached";


const Learning = () => {


    const [studyList, setStudyList] = useState([{ id: [], title: '', }]);
    const [teachList, setTeachList] = useState([{ id: [], title: '', }]);


    const GetLearning = async () => {
        console.log('id depuis studyList:', studyList.id);
        console.log('id depuis teachList:', teachList.id);
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/learning', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            const dataList = await response.json();
            setStudyList(dataList);
            console.log("list SeeList apres JSON:", dataList);
            setTeachList(dataList);
            console.log("list courseList apres JSON:", dataList);

        }
        catch (error) {
            console.error(error.message);
        }
    }
    // useEffect(() => { GetLearning() }, []);





    return (
        <main>
            <div className="learning">
                <h2 id="learning">Apprentissage</h2>
                <span className="learning-section">
                    <div className="skillsList">
                        <h3>Apprentissage en cours</h3>
                        <ul>
                            {studyList?.map((item) => (
                                <li key={item?.id}>
                                    <CourseStudent
                                        title={item?.title}
                                    />
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="skillsList">
                        <h3>Cours dispenses</h3>
                        <ul>
                            {teachList?.map((item) => (
                                <li key={item?.id}>
                                    <CourseTeached
                                        title={item?.title}
                                    />
                                </li>
                            ))
                            }
                            <button className="btn">EN ATTENTE</button>
                        </ul>
                    </div>
                </span>

            </div >
        </main >
    )
};
export default Learning;