import { useState, useEffect, useCallback } from "react";


const Learning = () => {

    const [studyList, setStudyList] = useState([]);
    const [teachList, setTeachList] = useState([]);


    const GetLearning = useCallback(async () => {

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
    })
    useEffect(() => { GetLearning() }, [studyList, teachList]);





    return (
        <main>

            <div className="learning">
                <h2 id="learning">Apprentissage</h2>
                <span className="learning-section">
                    <div className="skillsList">
                        <h3>Apprentissage en cours</h3>
                        <ul>
                            <span>

                                {studyList.map((item) => (
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
                                {teachList?.map((item) => (
                                    <li key={item?.id}>
                                        title={item?.title}
                                    </li>
                                ))
                                }
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