const Learning = ({ handleSubmit, register, isValid, skillsList }) => {


    const GetLearning = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataLearning = await response.json();
            console.log(" response apres .json:", dataLearning);

            //=fetch back side's errors
            console.log("error?:", dataLearning.error);
            setError(dataLearning.error);

        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }


    return (
        <main>

            <div className="learning">
                <h2 id="learning-id">Apprentissage</h2>
                <div className="skillsList">
                    <h3>Apprentissage en cours</h3>
                    <ul>
                        <span>
                            <li>
                                {skillsList?.map((item) => (
                                    < Skill
                                        key={item?.id}
                                        title={item?.title}
                                    />
                                ))
                                }
                                test de visuel learning
                            </li>
                            <span>
                                <button type="reset" className="redBtn">NON DEMARRE</button>
                            </span>
                        </span>

                    </ul>
                </div>
                <div className="skillsList">
                    <h3>Cours dispenses</h3>
                    <ul>
                        <span>
                            <li>
                                {skillsList?.map((item) => (
                                    < Skill
                                        key={item?.id}
                                        title={item?.title}
                                    />
                                ))
                                }
                                test de visuel teacher
                            </li>
                            <span>
                                <button type="reset" className="redBtn">NON DEMARRE</button>
                            </span>
                        </span>
                    </ul>
                </div>
            </div >
        </main >
    )
};
export default Learning;