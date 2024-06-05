import { isLogged } from '../../../util';
import PropTypes from 'prop-types';
import SkillRating from '../../statistic/skillRating';
import { useState } from 'react';
import Cookies from 'js-cookie';

const Skill = ({
    Category,
    picture,
    title,
    price,
    mark,
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
    presentation

}) => {

    const [skill, setSkill] = useState({
        id: [],
        title: '',
    })

    //=post method to add course to studyList
    const AskInscriptionCourse = async (skillData) => {
        try {
            console.log('data envoyees:', skill);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/learning/${skillData.id}`, {
                method: 'POST',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(skillData)
                // credentials: 'include',
            })

            // console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response post skill avant .json", response);
            const dataAdding = await response.json();
            console.log(" dataAdding  apres .json:", dataAdding);

            //=fetch back side's  errors
            // console.log("error?:", dataProfile.error);
        }
        catch (error) {
            console.log("erreur : ", error);
        }
    }

    handleChange = () => {
        AskInscriptionCourse(skill);
    }




    return (
        <>
            <div id="skill" >
                {!isLogged ? (
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
                            <h4>Note : </h4> <SkillRating />
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
                }
                <button onSubmit={handleChange}>SUIVRE CE COURS</button>
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