import { useState } from "react";



const SkillRating = ({ initialRating }) => {

    const [rating, setRating] = useState(initialRating);
    let stars = Array(5).fill();

    const handleStartClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <>
            <h4>Note : {rating} </h4>
            <span>{stars.map((_, index) => (
                <span key={index} onClick={() => handleStartClick(index + 1)}
                    style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}>
                    &#9733
                </span>
            ))}
            </span>
        </>
    )
}
export default SkillRating;