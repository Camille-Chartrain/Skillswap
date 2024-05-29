import { useState, useEffect } from "react";
import Skill from "../skillList";

const Learning = () => {
    const [seeList, setSeeList] = useState([]);

    const [courseList, setCourseList] = useState([]);

    const GetLearning = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/learning`);
            const dataSkill = await response.json();
            setSeeList(dataSkill);
            console.log(dataSkill);
            setCourseList(dataSkill)
        }
        catch (error) {
            console.error(error.message);
        }

        useEffect(() => { GetLearning() }, []);
    }



    return (
        <main>

            <div className="learning">
                <h2 id="learning">Apprentissage</h2>
                <span className="learning-section">
                    <div className="skillsList">
                        <h3>Apprentissage en cours</h3>
                        <ul>
                            <span>
                                <li>
                                    {seeList?.map((item) => (
                                        < Skill
                                            key={item?.id}
                                            title={item?.title}
                                        />
                                    ))
                                    }
                                    test de visuel learning
                                </li>
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
                                <li>
                                    {courseList?.map((item) => (
                                        < Skill
                                            key={item?.id}
                                            title={item?.title}
                                        />
                                    ))
                                    }
                                    test de visuel teacher
                                </li>
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