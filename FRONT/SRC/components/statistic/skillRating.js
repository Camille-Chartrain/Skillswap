import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const SkillRating = ({ initialRating }) => {

    const [rating, setRating] = useState(initialRating);
    let stars = Array(5).fill();

    const handleStartClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <>
            <span>{stars.map((_, index) => (
                <span key={index} onClick={() => handleStartClick(index + 1)}
                    style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            ))}
            </span>
        </>
    )
}
export default SkillRating;