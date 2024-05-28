import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Skill from "../skillList";

const Communication = () => {

    const [notification, setNotification] = useState([]);

    const [message, setMessage] = useState([]);

    const GetCommunicate = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/comunication`);
            const dataSkill = await response.json();
            setNotification(dataSkill);
            console.log(dataSkill);
            setMessage(dataSkill)
        }
        catch (error) {
            console.error(error.message);
        }

        useEffect(() => { GetCommunicate() }, []);
    }



    return (
        <main>

            <div className="communication">
                <h2 id="communication">COMMUNICATION</h2>
                <span className="communication-section">
                    <div className="skillsList">
                        <h3>Notifications</h3>
                        <ul>
                            <span>
                                <li>
                                    {notification?.map((item) => (
                                        < Skill
                                            key={item?.id}
                                            title={item?.title}
                                        />
                                    ))
                                    }
                                    test de visuel communication
                                </li>
                                <span>
                                    <button type="reset" className="btn">SUPPRIMER</button>
                                </span>
                            </span>

                        </ul>
                    </div>
                    <div className="skillsList">
                        <h3>Messagerie</h3>
                        <ul>
                            <span>
                                <li>
                                    {message?.map((item) => (
                                        < Skill
                                            key={item?.id}
                                            title={item?.title}
                                        />
                                    ))
                                    }
                                    test de visuel teacher
                                </li>
                                <span>
                                    <button type="reset" className="btn">SUPPRIMER</button>
                                </span>
                            </span>
                        </ul>
                    </div>
                </span>

            </div >
        </main >
    )

};
export default Communication;