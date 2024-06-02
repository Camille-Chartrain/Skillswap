import { useState } from "react";

const SkillRating = ({ initialRating }) => {
    const [rating, setRating] = useState(initialRating);

    const handleStartClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <>
            <h4>Note :{rating} </h4>
            <span>{[...stars(5)].map((_, index => (
                <span key={index} onClick={() => handleStartClick(index + 1)}
                    style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}>
                    &#9733
                </span>
            )))}
            </span>
        </>
    )
}
export default SkillRating;