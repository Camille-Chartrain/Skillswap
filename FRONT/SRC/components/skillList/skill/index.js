import { isLogged } from '../../../util';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Error from '../../error/error';
import { useLocation } from 'react-router-dom';


const Skill = ({
    Category,
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
    firstname,
    lastname,
    email,
    grade_level,
    presentation,

}) => {


    const location = useLocation();
    const skillToSee = location.state?.item;

    console.log("skillToSee ds Skill avant le state:", skillToSee);
    const [skill, setSkill] = useState(skillToSee || {
        id: [],
        Category: '',
        SubCategory: '',
        title: '',
        price: '',
        mark: '',
        level: '',
        duration: '',
        transmission: '',
        description: '',
        availability: '',
    })

    let stars = Array(5).fill();

    //=post method to add course to studyList
    const AskInscriptionCourse = async ({ skill }) => {
        try {
            console.log('data envoyees:', skill);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/learning/${skill.id}`, {
                method: 'POST',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(skill)
                // credentials: 'include',
            })

            // console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response post skill avant .json", response);
            const dataAdding = await response.json();
            console.log(" dataAdding  apres .json:", dataAdding);

            //=fetch back side's  errors
            console.log("erreur back:", dataAdding.error);



            if (dataAdding === "") {//*message de validate
                SetNotificationList(user.id);
                navigate('/dashboard');
            }
            else {
                throw new Error("Invalid response from API");
            }
            setSkill(dataAdding);
        }
        catch (error) {
            console.log("catch AIC : ", error);
            // handleNotFoundError();
        }
    }
    handleChange = () => {
        AskInscriptionCourse(skill.id);
    }

    //=get method for fetch datas from the Back
    const getSkill = useCallback(async (skillToSee) => {
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
            console.log("item avt json:", skill);
            const dataSkill = await response.json();
            console.log("dataSkill ds getSkill:", dataSkill);
            setSkill(dataSkill);
            setValue

            //= update inputs' values
            Object.keys(dataSkill).forEach(key => {
                setValue(key, getSkill[key]);
            });
        }
        catch (error) {
            console.error("catch de skillUpDate:", error);

        }
    })
    useEffect(() => { getSkill() }, [getSkill])






    return (
        <>
            <div id="skill" >
                {skillToSee ? (
                    //-> one skill to see more button
                    <>
                        {console.log("ds loop return STS:", skillToSee)}
                        {console.log("ds loop return Skill:", skill)}
                        <div className="skill-header">
                            <img src={`http://localhost:3000/${picture}`} alt="photo de la categorie" />
                            <h4>Description :</h4> <span>{skillToSee.description}  </span>
                            <h4>Duree :</h4><span>{skillToSee.duration}</span>
                        </div>
                        <div className="skill-info">
                            <h4>Categorie :</h4> <span>{skillToSee.Category}</span>
                            <h4>Sous categorie :</h4>  <span>{skillToSee.SubCategory}</span>
                            <h4>Competence :</h4><span> {skillToSee.title}</span>
                            <h4>Niveau : </h4><span>{skillToSee.level}</span>
                            <h4>Prix : </h4> <span>{skillToSee.price}</span>
                            <h4>Note : </h4>  <span>{
                                stars?.map((_, index) => (
                                    <span key={index}
                                        style={{ color: index < skillToSee.averageMark ? 'gold' : 'gray' }} >
                                        < FontAwesomeIcon icon={faStar} />
                                    </span>))}
                            </span>
                        </div>
                        <div className='skill-teacher'>
                            <h4>Disponibilite :</h4><span>{skillToSee.availability}</span>
                            <h4>Transmission :</h4><span>{skillToSee.transmission}</span>
                            <h4>Professeur :</h4> <span> {`${skillToSee.firstname} ${skillToSee.lastname}`}</span>
                            <h4>Email : </h4><span>{skillToSee.email}</span>
                            <h4>Niveau d'etudes :</h4><span>{skillToSee.grade_level}</span>
                            <h4>Presentation :</h4> <span>{skillToSee.presentation}</span>
                        </div >
                    </>
                ) : (
                    //->skillList model for home's composant
                    !isLogged ? (
                        <>
                            <div className="skill-header">
                                <img src={`http://localhost:3000/${picture}`} alt="photo de la categorie" />
                                <h4>Description :</h4> <span>{description}  </span>
                                <h4>Duree :</h4><span>{duration}</span>
                            </div>
                            <div className="skill-info">
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

                            </div>
                        </>
                    ) : (
                        <div className='skill-teacher'>
                            <h4>Disponibilite :</h4><span>{availability}</span>
                            <h4>Transmission :</h4><span>{transmission}</span>
                            <h4>Professeur :</h4> <span> {`${firstname} ${lastname}`}</span>
                            <h4>Email : </h4><span>{email}</span>
                            <h4>Niveau d'etudes :</h4><span>{grade_level}</span>
                            <h4>Presentation :</h4> <span>{presentation}</span>
                        </div >

                    )
                )}
                < button type="submit" onSubmit={handleChange}>SUIVRE CE COURS</button>
            </div >
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