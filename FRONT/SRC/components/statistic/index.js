import { useState, useEffect } from "react";
import Skill from "../skillList";
import { Money } from "./money";
import { transactionMoney } from "./money";

const Statistic = () => {

    const [money, setMoney] = useState([]);
    const [courseMark, setCourseMark] = useState([]);


    //=manage courses'rate

    let addHeart = "";
    let addClass = "";

    if (typeof (mark) === 'undefined') {
        addHeart = "Pas encore note";
        addClass = "norate"
    } else {
        for (let i = 0; i < mark; i++) {
            addHeart += "❤️";
        };
        for (let i = 0; i < 5 - mark; i++) {
            addHeart += "🖤";
        };
    }



    const GetStatistic = async (data) => {
        console.log(data);
        try {
            const response = await fetch(`http://localhost:3000/statistic`);
            const dataSkill = await response.json();
            console.log(dataSkill);

            setMoney(dataSkill);
            setCourseMark(dataSkill)
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
                <span className="statistic-section">
                    <Money />
                    <div className="skillsList">
                        <h3>Notations competences</h3>
                        <ul>
                            <span>

                                {courseMark?.map((item) => (

                                    <li key={item?.id}>
                                        title={item?.title}
                                        note={item?.mark}
                                    </li>
                                ))
                                }
                                test de visuel teacher

                            </span>
                        </ul>
                    </div>
                </span>
            </div >
        </main >
    )

};
export default Statistic;