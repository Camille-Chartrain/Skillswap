import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

import './style.scss';



function StarRating({ rating }) {
    // Arrondir la note à la demi-étoile la plus proche
    const roundedRating = Math.round(rating * 2) / 2;

    const getStars = (rating) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FontAwesomeIcon icon={faStar} key={i} className="star filled" />);
            } else if (i - rating === 0.5) {
                stars.push(<FontAwesomeIcon icon={faStarHalfStroke} key={i} className="star half-filled" />);
            } else {
                stars.push(<FontAwesomeIcon icon={faStar} key={i} className="star empty" />);
            }
        }

        return stars;
    };

    return (
        <div className="star-rating">
            {getStars(roundedRating)}
        </div>
    );
}

export default StarRating;
