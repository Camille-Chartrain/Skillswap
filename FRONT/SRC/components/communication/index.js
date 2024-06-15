
import NotificationsList from "../notificationsList";
import NotificationRating from '../notificationsList/notificationRating';
import Error from "../error/error";

const Communication = () => {


    return (


        <div className="communication">
            <h2 id="communication">COMMUNICATION</h2>
            <span className="communication-section">
                <div className="communicationList">
                    <h3>Notifications</h3>
                    <span className="notif-section">
                        <NotificationsList />
                        <NotificationRating />

                    </span>
                </div>
                {/* //= coding in place for version2
                    <div className="skillsList">
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
                    </div> */}
            </span>
        </div >
    )

};
export default Communication;