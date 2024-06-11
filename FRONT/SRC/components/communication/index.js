import { useState, useEffect } from "react";
import NotificationsList from "../notificationsList";
import NotificationRating from '../notificationsList/notificationRating';

const Communication = () => {

    return (
        <main>

            <div className="communication">
                <h2 id="communication">COMMUNICATION</h2>
                <span className="communication-section">
                    <div className="skillsList">
                        <h3>Notifications</h3>
                        <span>
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
        </main >
    )

};
export default Communication;