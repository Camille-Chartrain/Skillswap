import { NotificationType } from "../../../util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const Notification = ({ type, message, icone, buttonText, onClick, rating }) => {

    const [rating, setRating] = useState(0);

    //=rating update
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

    //patch pour noter http-> /communication/:skillId

    return (
        <NotificationContainer type={type}>
            <img>{icone}</img>
            <p>{message}</p>
            <span>Noter: {renderStars()}</span>
            {buttonText && <button onClick={onClick}>{buttonText}</button>}
        </NotificationContainer>
    );
};

export default Notification;