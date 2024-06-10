import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const SkillRating = () => {

    const [rating, setRating] = useState(null);
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
                    {rating && rating.length > 0 ? (
                        rating?.map((item) => (
                            <div key={item.id}>
                                <li>{item?.title} </li>
                                <span>{
                                    stars?.map((_, index) => (
                                        <span key={index}
                                            style={{ color: index < item?.averageMark ? 'gold' : 'gray' }} >
                                            < FontAwesomeIcon icon={faStar} />
                                        </span>))}
                                </span>
                            </div>
                        ))

                    ) : (
                        rating?.map((item) => (
                            <div key={item.id}>
                                <li>{item?.title}:<p>Aucune note attribuée</p> </li>
                            </div>
                        )))
                    }
                </ul >
            </div >
        </>
    )
}
export default SkillRating;


// return (
//     <main>
//         <div className="statistic">
//             <h2 id="statistic">STATISTIQUES</h2>
//             <span className="statistic-section">
//
//                 <div className="skillsList">
//                     <h3>Notations competences</h3>
//                     <ul>
//                         {courseMark && courseMark.length > 0 ? (
//                             courseMark?.map((item) => (
//                                 <div key={item.id} >
//                                     <li onChange={handleChangeStatistic.bind(null, item)}>
//                                         {item?.title}:<SkillRating initialRating={item?.averageMark} />
//                                     </li>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>Aucune compétence notée</p>
//                         )
//                         }
//                     </ul>
//                 </div>
//             </span>
//         </div >
//     </main >
// )

