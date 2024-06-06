import { NotificationType } from '../../util';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';





const NotificationsList = () => {

    const [NotificationsList, setNotificationsList] = useState([]);

    const GetNotificationsList = async () => {
        try {
            const response = await fetch(`http://localhost:3000/communication`);
            const dataNotifications = await response.json();
            setNotificationsList(dataNotifications);
            console.log(dataNotifications);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { GetNotificationsList() }, [])

    return (
        <div className='container'>
            {
                NotificationsList?.map((item) => (
                    <>
                        < Notification//->patch student
                            key={item?.id}
                            type={item?.type}
                            message={"Votre cours est termine, souhaitez vous le noter ?"}
                            rating={renderStars()}
                        />

                        <Notification //->n front ->teacher
                            key={item?.id}
                            type={NotificationType.MONEY}
                            message={"Votre avez gagne 1 Swappy"}
                        />
                        <Notification //->get id ds btn avec un navigate http oneSkill/:skillId
                            key={item?.id}
                            type={NotificationType.INTEREST}
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





