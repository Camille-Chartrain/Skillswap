import { useState, useEffect } from "react";
import Skill from "../skillList";

const Learning = () => {
    const [seeList, setSeeList] = useState([]);

    const [courseList, setCourseList] = useState([]);

    const GetLearning = async () => {
        // console.log('recup des datas GetLearning:', data);
        try {
            console.log("essai de fetch get learning");
            const response = await fetch(`http://localhost:3000/learning`, {
                method: "get",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // body: JSON.stringify(data),
                // credentials: 'include'
            });
            console.log("response learning", response);
            const dataSkill = await response.json();
            setSeeList(dataSkill);
            console.log("reponse Learning apres .json => dataSkill", dataSkill);
            setCourseList(dataSkill)
            console.log("state seeList LEARNING", seeList);
        }
        catch (error) {
            console.error(error.message);
        }

        useEffect(() => { GetLearning() }, [dataSkill]);
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
                            <span>

                                {seeList.map((item) => (
                                    <li key={item?.id}>
                                        title={item?.title}
                                    </li>
                                ))
                                }
                                test de visuel learning

                                <span>
                                    <button className="btn">EN ATTENTE</button>
                                    {/* // passe en valider a l'acceptation du prof puis en terminer pour finir */}

                                </span>
                            </span>

                        </ul>
                    </div>
                    <div className="skillsList">
                        <h3>Cours dispenses</h3>
                        <ul>
                            <span>
                                {courseList?.map((item) => (
                                    <li key={item?.id}>
                                        title={item?.title}
                                    </li>
                                ))
                                }
                                test de visuel teacher
                                <span>
                                    <button className="btn">EN ATTENTE</button>
                                    {/* // passe en valider a l'acceptation du prof puis en terminer pour finir */}

                                </span>
                            </span>
                        </ul>
                    </div>
                </span>

            </div >
        </main >
    )
};
export default Learning;