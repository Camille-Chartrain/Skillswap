
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const NotificationsList = () => {

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

    // const handleChange = (item) => {
    //     navigate('/oneSkill/item.id');
    // }


    return (
        <div className='container'>
            {
                notification?.map((item) => (
                    <>

                        <ul>
                            <li key={item?.id}>
                                <p>"Ceci pourait vous interesser"</p>
                                <p>cours: {item.title}</p>
                                <button onClick={handleChange(item.id)}>VOIR PLUS</button>
                                <button type="reset" className="btn">SUPPRIMER</button>

                            </li>
                        </ul>
                    </>
                ))
            }
        </div >
    )

}
export default NotificationsList;

// ->get id ds btn avec un navigate http oneSkill/:skillId



