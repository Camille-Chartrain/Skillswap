
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Error from '../error/error';


const NotificationsList = ({ }) => {

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
            // console.log("dataNotifications:", dataNotifications);

            setNotification(dataNotifications);
            console.log("setNotification:", dataNotifications);
        }
        catch (error) {
            console.log("catch de GNL:", error);
        }
    }

    useEffect(() => { GetNotificationsList() }, []);

    const handleChange = (item) => {

        console.log('ds HC navigate item:', item);
        navigate('seeASkill/', {
            state: { item }
        });
    }

    // //= version2 coding
    // //=delete notification
    // const handleDeleteNotif = (item) => {
    //     navigate('/communication',
    //         {
    //             state: { item }
    //         }
    //     )
    // };

    // //=to delete a notification
    // const NotificationDelete = useCallback(async (item) => {
    //     try {
    //         console.log("id recup ds le try ND :", item);
    //         const token = Cookies.get('token');
    //         const response = await fetch(`http://localhost:3000/communication/${item.id}`, {
    //             method: "delete",
    //             status: 200,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(item),
    //             // credentials: 'include'
    //         })

    //         //=traduct api response in Json
    //         console.log("response avant .json", response);
    //         const dataNotification = await response.json();
    //         console.log("dataNotification ds le  notifDelete :", dataNotification);
    //     }
    //     catch (error) {
    //         console.log("catch NotificationDelete:", error);
    //     }
    // })


    return (
        <div className='container'>
            <h5>Nos nouveautes selon vos interets: </h5>
            <ul> {
                notification?.map((item) => (
                    <li key={item?.id}>
                        <p>{item.title}</p>
                        <button onClick={() => handleChange(item)}>VOIR PLUS</button>

                        {/* //= coding for version2
                            <button type="reset" className="btn" onClick={NotificationDelete.bind(null, item)} onChange={handleDeleteNotif}>SUPPRIMER</button> */}

                    </li>
                ))
            }</ul>
        </div >
    )

}
export default NotificationsList;

// ->get id ds btn avec un navigate http oneSkill/:skillId



