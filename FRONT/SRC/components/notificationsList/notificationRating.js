import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Error from '../error/error';


const NotificationRating = ({ handleNotFoundError, setError, error }) => {

    const [rating, setRating] = useState([]);
    const [skillsToRate, setSkillstoRate] = useState([]);

    const GetSkillToRate = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/communicationSkillToRate`, {
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
            setError("Erreur de chargement des donnees");
            handleNotFoundError("Erreur de chargement des donnees");
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
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/communication/${item.id}`, {
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
            console.log(" response apres .json:", dataRating);
            GetSkillToRate();


        }
        catch (error) {
            console.log("catch de RatingPatch : ", error);
            setError("Erreur lors de la notation");
            handleNotFoundError("Erreur lors de la notation");
        }
    };



    return (
        <span className='markList'>
            {error && <Error error={error} />}
            <h4>Notez les cours suivis: </h4>
            <ul>
                {/* {console.log("rating jsx", skillsToRate)} */}
                {skillsToRate && skillsToRate.length > 0 ?

                    skillsToRate?.map((item) => (
                        <>
                            <li className="mark-li" key={item.id}>
                                <span>{item.title}</span>
                                <span className='stars'>{renderStars()}
                                    <button className='blueBtn' onClick={(RatingPatch.bind(null, item))}>VALIDER LA NOTE</button>
                                </span>
                            </li>

                            {/* //=version2 coding
                        <button type="reset" className="btn" onClick={() => handleDeleteNotification(null, item)}>SUPPRIMER</button> */}
                        </>
                    ))
                    : (
                        <p> Pas de cours à noter </p>
                    )}

            </ul>
        </span>
    );

};

export default NotificationRating;