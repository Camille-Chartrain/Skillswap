import { useState, useEffect } from "react";
import Skill from "../skillList";
const Statistic = () => {

    const [money, setMoney] = useState([]);
    const [courseList, setCourseList] = useState([]);

    const GetStatistic = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/statistic`);
            const dataSkill = await response.json();
            setMoney(dataSkill);
            console.log(dataSkill);
            setCourseList(dataSkill)
        }
        catch (error) {
            console.error(error.message);
        }

        useEffect(() => { GetStatistic() }, []);
    }



    return (
        <main>
            <div className="statistic">
                <h2 id="statistic">STATISTIQUES</h2>
                <span classname="statistic-section">
                    <div className="skillsList">
                        <h3>Coffre au tresor</h3>
                        <ul>
                            <span>
                                <li> Swappies totals : </li>
                                <li> Swappies recus: </li>
                                <li> Swappies donnes : </li>
                            </span>
                        </ul>
                    </div>
                    <div className="skillsList">
                        <h3>Cours les plus demandes</h3>
                        <ul>
                            <span>
                                <li>
                                    {courseList?.map((item) => (
                                        < Skill
                                            key={item?.id}
                                            title={item?.title}
                                            note={item?.mark}
                                        />
                                    ))
                                    }
                                    test de visuel teacher
                                </li>
                            </span>
                        </ul>
                    </div>
                </span>
            </div >
        </main >
    )

};
export default Statistic;