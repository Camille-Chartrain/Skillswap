
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const NotificationsList = ({ NotificationDelete }) => {

    const [notification, setNotification] = useState([]);
    const navigate = useNavigate();

    const GetNotificationsList = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/communication`, {
                method: "get",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'

            });
            const dataNotifications = await response.json();
            console.log("dataNotifications:", dataNotifications);

            setNotification(dataNotifications);
            console.log("setNotification:", dataNotifications);
        }
        catch (error) {
            console.log("catch de GNL:", error);
        }
    }

    useEffect(() => { GetNotificationsList() }, []);

    const handleChange = (item) => {
        navigate('/oneSkill/', {
            state: { item }
        });
    }


    return (
        <div className='container'>
            <ul> {
                notification?.map((item) => (
                    <>
                        <li key={item?.id}>
                            <p>"Ceci pourrait vous interesser: "{item.title}</p>
                            <button onClick={() => handleChange.bind(null, item)}>VOIR PLUS</button>
                            {/* <button type="reset" className="btn" onClick={NotificationDelete.bind(null, item)}>SUPPRIMER</button> */}
                        </li>
                    </>
                ))
            }</ul>
        </div >
    )

}
export default NotificationsList;

// ->get id ds btn avec un navigate http oneSkill/:skillId



