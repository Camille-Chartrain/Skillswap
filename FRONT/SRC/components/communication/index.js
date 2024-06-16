
import NotificationsList from "../notificationsList";
import NotificationRating from '../notificationsList/notificationRating';
import Error from "../error/error";

const Communication = () => {


    return (


        <span className="communication">
            <h2 id="communication">COMMUNICATION</h2>
            <span className="communication-section">
                <span className="communicationList">
                    <h3>Notifications</h3>
                    <span className="notif-section">
                        <NotificationsList />
                        <NotificationRating />

                    </span>
                </span>
                {/* //= coding in place for version2
                    <span className="skillsList">
                        <h3>Messagerie</h3>
                        <ul>
                            <span>
                                <li>
                            
                                </li>
                                <span>
                                    <button type="reset" className="btn">SUPPRIMER</button>
                                </span>
                            </span>
                        </ul>
                    </span> */}
            </span>
        </span >
    )

};
export default Communication;