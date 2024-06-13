import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Communication from '../communication';


const NotificationRating = ({ handleDeleteNotification }) => {

    const [rating, setRating] = useState([]);
    const [skillsToRate, setSkillstoRate] = useState([]);

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
            // console.log("dataSkillToRate:", dataSkillToRate);

            setSkillstoRate(dataSkillToRate);
            // console.log(" state skillsTORate:", skillsToRate);
            // console.log("type of skillsToRAte", typeof skillsToRate);
        }
        catch (error) {
            console.log("catch de GSTR:", error);
        }
    };
    useEffect(() => { GetSkillToRate(); }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

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

    //=patch method to send the mark to skill
    const RatingPatch = async (item) => {

        try {
            // console.log('id url envoye:', item.id);
            // console.log("rating", rating);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/communication/${item.id}`, {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify([rating])
                // credentials: 'include',
            });

            console.log('response.status:', response.status);

            //=traduct api response in Json
            // console.log("response patch data avant .json", response);
            const dataRating = await response.json();
<<<<<<< HEAD
            console.log(" response apres .json:", dataRating);
            GetSkillToRate();
=======
            // console.log(" response apres .json:", dataRating);
>>>>>>> 7958d123cdfce5618135c20e32c18099555e1fba


        }
        catch (error) {
            console.log("catch de RatingPatch : ", error);
        }
    };



    return (
        <ul>
            {/* {console.log("rating jsx", skillsToRate)} */}
            {skillsToRate && skillsToRate.length > 0 ?

                skillsToRate?.map((item) => (
                    <li key={item.id}>
                        <h6>{item.title}</h6>
                        <span>Souhaitez vous le noter: {renderStars()}</span>
                        <button onClick={(RatingPatch.bind(null, item))}>VALIDER LA NOTE</button>


                        {/* //=version2 coding
                        <button type="reset" className="btn" onClick={() => handleDeleteNotification(null, item)}>SUPPRIMER</button> */}

                    </li>
                ))
                : (
                    <p> Pas de cours à noter </p>
                )}

        </ul>
    );

};

export default NotificationRating;