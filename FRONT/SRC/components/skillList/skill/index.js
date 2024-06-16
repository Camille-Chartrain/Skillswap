import { isLogged } from '../../../util.js';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import Error from '../../error/error';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Skill = ({
    Category,
    CategoryId,
    picture,
    title,
    price,
    averageMark,
    level,
    duration,
    transmission,
    description,
    availability,
    SubCategory,
    SubCategoryId,
    firstname,
    lastname,
    email,
    grade_level,
    presentation,
    skillId

}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.item;
    console.log("item ds Skill avant le state:", item);
    const [skill, setSkill] = useState(item || {
        id: [],
        title: '',
    })

    let stars = Array(5).fill();

    const [statusCourse, setStatusCourse] = useState(false);



    const handleClick = async (event, skillId) => {
        console.log("dans la fonction handleClick suivre ce cours");
        event.preventDefault();

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/dashboard`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            console.log("response avant json:", response)
            const authResult = await response.json();
            console.log("authResult apres json dans Skill click inscription au cours:", authResult)

            if (authResult == "access granted") {
                console.log("acces granted dans handleclik Skill, on va fetch vers demande d'inscription");
                console.log("skillId", skillId);

                try {
                    console.log('dans le try AskInscriptionCourse');
                    const token = Cookies.get('token');
                    const response = await fetch(`http://localhost:3000/learning/${skillId}`, {
                        method: 'POST',
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        // credentials: 'include',
                    })

                    //=traduct api response in Json
                    console.log("response post skill avant .json", response);
                    const dataAdding = await response.json();
                    console.log(" dataAdding  apres .json:", dataAdding);


                    if (dataAdding === "cours en attente de validation") {//*message de validate
                        // navigate('/dashboard');
                        setStatusCourse(true)
                        // navigate('/results')
                        console.log("cours en attende de validation OK on est redirigé vers dashboard");
                        navigate("/results")
                        // navigate('/dashboard')
                    }
                    else {
                        throw new Error("Invalid response from API");
                    }
                }
                catch (error) {
                    console.log("catch AIC : ", error);
                    // handleNotFoundError();
                }
            }
            else if (authResult.error == "Token invalide") {
                console.log("token ivalide dans handleclik Skill redirection vers registration");
                navigate('/registration')
            }
            else {
                console.log("autre cas d'erreur au click sur inscription au cours dans Skill");
                navigate('/registration')
            }
        }
        catch (error) {
            console.error("catch de handleClick dans Skill:", error);
            // handleNotFoundError();
        }
    }

    //=get method for fetch datas from the Back
    const getSkill = useCallback(async (skill) => {
        console.log('id depuis item:', item)
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/oneSkill/${skill.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            console.log("item avt json:", skill)
            const dataSkill = await response.json();
            console.log("dataSkill ds getSkill:", dataSkill)
            setSkill(dataSkill);

            //= update inputs' values
            Object.keys(dataSkill).forEach(key => {
                setValue(key, getSkill[key]);
            });
        }
        catch (error) {
            console.error("catch de skillUpDate:", error);
            // handleNotFoundError();
        }
    })
    // useEffect(() => { getSkill() }, [getSkill])
    useEffect(() => { }, [getSkill])


    return (
        <>
            <span id="skill" >
                {!isLogged ? (
                    <>
                        <span className="skill-header">
                            <img src={`http://localhost:3000/${picture}`} alt="photo de la categorie" />
                            <h4>Description :</h4> <span>{description}</span>
                            <h4>Duree :</h4><span>{duration}</span>
                        </span>
                        <span className="skill-info">
                            <h3>{title}</h3>
                            <h4>Categorie :</h4> <span>{Category}</span>
                            <h4>Sous categorie :</h4>  <span>{SubCategory}</span>
                            <h4>Niveau : </h4><span>{level}</span>
                            <h4>Prix : </h4> <span>{price}</span>
                            <h4>Note : </h4>  <span>{
                                stars?.map((_, index) => (
                                    <span key={index}
                                        style={{ color: index < averageMark ? 'gold' : 'gray' }} >
                                        < FontAwesomeIcon icon={faStar} />
                                    </span>))}
                            </span>
                        </span>
                        <span className='skill-teacher'>
                            <h4>Disponibilite :</h4><span>{availability}</span>
                            <h4>Transmission :</h4><span>{transmission}</span>
                            <h4>Professeur :</h4> <span> {`${firstname} ${lastname}`}</span>
                            <h4>Email : </h4><span>{email}</span>
                            <h4>Niveau d'etudes :</h4><span>{grade_level}</span>
                            <h4>Presentation :</h4> <span>{presentation}</span>
                        </span >
                    </>
                ) : (
                    <>
                        <span className="skill-header">
                            <img src={`http://localhost:3000/${picture}`} alt="photo de la categorie" />
                            <h4>Description :</h4> <span>{description}  </span>
                            <h4>Duree :</h4><span>{duration}</span>
                        </span>
                        <span className="skill-info">
                            <h4>Categorie :</h4> <span>{Category}</span>
                            <h4>Sous categorie :</h4>  <span>{SubCategory}</span>
                            <h4>Competence :</h4><span> {title}</span>
                            <h4>Niveau : </h4><span>{level}</span>
                            <h4>Prix : </h4> <span>{price}</span>
                            <h4>Note : </h4>  <span>{
                                stars?.map((_, index) => (
                                    <span key={index}
                                        style={{ color: index < averageMark ? 'gold' : 'gray' }} >
                                        < FontAwesomeIcon icon={faStar} />
                                    </span>))}
                            </span>

                        </span>
                    </>

                )
                }
                {statusCourse && <p>Demande envoyée !</p>}
                {!statusCourse && <button className="skillBtn" type="submit" onClick={function (event) { handleClick(event, skillId); }}>SUIVRE CE COURS</button>}
            </span >
        </>
    )
};

Skill.propTypes = {

    picture: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    mark: PropTypes.number,
    level: PropTypes.string,
    duration: PropTypes.string,
    transmission: PropTypes.string,
    availability: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    grade_level: PropTypes.string,
    presentation: PropTypes.string,

}

export default Skill;