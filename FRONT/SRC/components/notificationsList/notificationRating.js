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
            console.log("setRating:", dataSkillToRate);
        }
        catch (error) {
            console.log("catch de GSTR:", error);
        }
    }

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
    const RatingPatch = async (data) => {
        try {
            console.log('data envoyees:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/communication/${skill.id}`, {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
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
    }



    return (

        <ul>
            {rating?.map((item) => {
                <li>
                    <h6> {item.title}</h6>
                    <span>Souhaitez vous le noter: {renderStars()}</span>
                    <button onClick={handleRatingChange(RatingPatch.bind(null, item))}>VALIDER LA NOTE</button>
                    <button type="reset" className="btn" onClick={handleDeleteNotification}>SUPPRIMER</button>
                </li>
            })}
        </ul>
    );
};

export default NotificationRating;