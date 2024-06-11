import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const SkillRating = () => {

    const [rating, setRating] = useState([]);
    let stars = Array(5).fill();
    // console.log("rating avant get:", rating);

    const GetRating = async () => {

        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/Statistic', {
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
        }
    }
    useEffect(() => { GetRating() }, []);



    return (
        <>
            <div className="skillsList">
                <h3>Notations competences</h3>
                <ul>
                    {rating.length > 0 && rating?.map((item) => (
                        <div key={item.id}>
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
                        </div>
                    ))}
                </ul >
            </div >
        </>
    )


}
export default SkillRating;



