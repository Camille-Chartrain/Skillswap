import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';



const NotificationRating = () => {

    const [rating, setRating] = useState(0);

    //=rating update
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    //->patch pour add bdd ->communication/${skill.id}
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

    //patch pour noter http-> /communication/:skillId

    return (
        <>

            <p></p>
            <span>Noter: {renderStars()}</span>
            <button ></button>
        </>
    );
};

export default NotificationRating;