
import NotificationsList from "../notificationsList";
import NotificationRating from '../notificationsList/notificationRating';

const Communication = () => {


    // //=version2 coding
    // //=delete notification
    // const handleDeleteNotification = (item) => {
    //     Navigate('/communication',
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
    //         //=fetch back side's  errors
    //         // console.log("error?:", dataNotification.error);
    //         setError(dataNotification.error);
    //     }
    //     catch (error) {
    //         console.log("catch NotificationDelete:", error);
    //     }
    // })


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