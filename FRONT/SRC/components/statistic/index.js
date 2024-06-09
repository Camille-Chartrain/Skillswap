import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Money } from "./money";
import SkillRating from './skillRating'
    ;

const Statistic = () => {

    const [statistic, setStatistic] = useState([]);
    const [courseMark, setCourseMark] = useState([]);

    //= to refresh the statisticData state between two changes
    const handleChangeStatistic = (e) => {
        e.preventDefault(e.target.value);
        const { name, value } = e.target;
        setStatistic((prevStatistic) => ({ ...prevStatistic, [name]: value }));
    }


    const GetStatistic = async () => {
        console.log();
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/statistic', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            // console.log("les statistic data avant  .json", response);
            const dataStatistic = await response.json();
            // console.log("les statistic data  apres .json:", dataStatistic);

            setStatistic(dataStatistic);
            // console.log('donnees statistic data du state:', dataStatistic);
            setCourseMark(dataStatistic);
            // console.log('donnees setCourseMark:', dataStatistic);


        }
        catch (error) {
            // console.log("catch de Get Statistic:", error.message);
        }
    }
    useEffect(() => { GetStatistic() }, []);


    return (
        <main>
            <div className="statistic">
                <h2 id="statistic">STATISTIQUES</h2>
                <span className="statistic-section">
                    <Money />
                    <div className="skillsList">
                        <h3>Notations competences</h3>
                        <ul>
                            {courseMark && courseMark.length > 0 ? (
                                courseMark?.map((item) => (
                                    <div key={item.id} >
                                        <li onChange={handleChangeStatistic.bind(null, item)}>
                                            {item?.title}:<SkillRating initialRating={item?.averageMark} />
                                        </li>
                                    </div>
                                ))
                            ) : (
                                <p>Aucune compétence notée</p>
                            )
                            }
                        </ul>
                    </div>
                </span>
            </div >
        </main >
    )
};
export default Statistic;