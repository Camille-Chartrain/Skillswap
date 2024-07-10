import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Error from '../error/error';



const SkillRating = ({ error, setError, handleNotFoundError }) => {

    const [rating, setRating] = useState([]);
    let stars = Array(5).fill();
    // console.log("rating avant get:", rating);

    const GetRating = async () => {

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/Statistic`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            // console.log("les Rating data avant  .json", response);
            const dataRating = await response.json();
            // console.log("les Rating data  apres .json:", dataRating);

            setRating(dataRating);
            // console.log('donnees Rating data du state:', dataRating);


        }
        catch (error) {
            console.log("catch de Get Rating:", error.message);
            setError("Votre demande n'a pas ete prise en compte");
            handleNotFoundError("Votre demande n'a pas ete prise en compte");
        }
    }
    useEffect(() => { GetRating() }, []);



    return (
        <span className="statisticList">
            <h3>Notes des competences</h3>
            {error && <Error error={error} />}
            <ul>
                {rating.length > 0 && rating?.map((item) => (
                    <span className="rating" key={item.id}>
                        <li>{item?.title} </li>
                        {item && item.averageMark && item.averageMark ? (
                            <span>{
                                stars?.map((_, index) => (
                                    <span key={index}
                                        style={{ color: index < item?.averageMark ? 'gold' : 'gray' }} >
                                        < FontAwesomeIcon icon={faStar} />
                                    </span>))}
                            </span>
                        ) : (
                            <p>Aucune note attribuée</p>
                        )}
                    </span>
                ))}
            </ul >
        </span >

    )


}
export default SkillRating;



