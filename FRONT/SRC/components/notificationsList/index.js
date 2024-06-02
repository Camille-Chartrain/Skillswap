import { NotificationType } from '../../util';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';





const NotificationsList = () => {

    const [NotificationsList, setNotificationssList] = useState([]);

    const GetNotificationssList = async () => {
        try {
            const response = await fetch(`http://localhost:3000/communication`);
            const dataNotifications = await response.json();
            setNotificationssList(dataNotifications);
            console.log(dataNotifications);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { GetNotificationssList() }, [])

    return (
        <div className='container'>
            {
                NotificationsList?.map((item) => (
                    <>
                        < Notification
                            key={item?.id}
                            type={item?.type}
                            icone={item?.icone}
                            message={"Votre cours est termine, souhaitez vous le noter ?"}
                            rating={renderStars()}

                        />
                        <Notification
                            key={item?.id}
                            type={NotificationType.MONEY}
                            icone={item?.icone}
                            message={"Votre avez gagne 1 Swappy"}
                        />
                        <Notification
                            key={item?.id}
                            type={NotificationType.INTEREST}
                            icone={item?.icone}
                            message={"Ceci pourait vous interesser"}
                            buttonText={item?.buttonText}
                            onClick={item?.onClick}
                        />

                    </>
                ))
            }
        </div >
    )

}
export default NotificationsList;





