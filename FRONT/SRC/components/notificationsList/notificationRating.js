import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';


const NotificationRating = (item, handleDeleteNotification) => {

    const [rating, setRating] = useState([]);

    const GetSkillToRate = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/communicationSkillToRate`, {
                method: "get",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'

            });
            const dataSkillToRate = await response.json();
            console.log("dataSkillToRate:", dataSkillToRate);

            setRating(dataSkillToRate);
            console.log(" state Rating:", dataSkillToRate);
            console.log("type of rate", typeof rating);
        }
        catch (error) {
            console.log("catch de GSTR:", error);
        }
    };
    useEffect(() => { GetSkillToRate() }, []);

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => handleRatingChange(i)}
                    style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'gray' }}
                >
                    <FontAwesomeIcon icon={faStar} />
                </span>
            );
        }
        return stars;
    };
    //=rating update
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        // RatingPatch();
    };
    //=patch method to send the mark to skill
    const RatingPatch = async (item) => {
        try {
            console.log('data envoyees:', item);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/communication/${item.id}`, {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(rating)
                // credentials: 'include',
            })

            console.log('response.status:', response.status);

            //=traduct api response in Json
            // console.log("response patch data avant .json", response);
            const dataRating = await response.json();
            console.log(" response apres .json:", dataRating);

            //=fetch back side's  errors
            // console.log("error?:", dataRating.error);

        }
        catch (error) {
            console.log("catch de RatingPatch : ", error);
        }
    };



    return (
        <ul>
            {console.log("rating jsx", rating)}
            {rating && rating.length > 0 ?

                rating?.map((item) => (
                    <li key={item.id}>
                        <h6>{item.title}</h6>
                        {/* <span>Souhaitez vous le noter: {renderStars()}</span> */}
                        {/* <button onClick={(RatingPatch.bind(null, item))}>VALIDER LA NOTE</button> */}
                        {/* <button onClick={handleRatingChange(RatingPatch.bind(null, item))}>VALIDER LA NOTE</button> */}
                        <button type="reset" className="btn" onClick={handleDeleteNotification}>SUPPRIMER</button>
                    </li>
                ))
                : (
                    <p> Pas de cours à noter </p>
                )}

        </ul>
    );

};

export default NotificationRating;