import { isLogged } from '../../../util';
import PropTypes from 'prop-types';
import SkillRating from '../../statistic/skillRating';
import { useState } from 'react';

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
    Sub_category,
    firstname,
    lastname,
    email,
    grade_level,
    presentation

}) => {

    const [skill, setSkill] = useState({
        id: skill.id,
        title: skill.title
    })

    //=post method to add course to studyList
    const CourseAdd = async (skill) => {
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
            console.log("response post profile avant .json", response);
            const dataAdding = await response.json();
            console.log(" response apres .json:", dataAdding);

            //=fetch back side's  errors
            // console.log("error?:", dataProfile.error);

        }
        catch (error) {
            console.log("erreur : ", error);
        }
    }

    handleChange = () => {
        setSkill();
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
                            <h4>Sous categorie :</h4>  <span>{Sub_category}</span>
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
                <button onSubmit={ }></button>
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