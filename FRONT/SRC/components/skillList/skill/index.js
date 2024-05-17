import { isLogged } from '../../../util';
import PropTypes from 'prop-types';

const Skill = ({
    id,
    Category,
    title,
    price,
    mark,
    level,
    duration,
    transmission,
    description,
    availability,
    Sub_category,
    User }) => {
    return (
        <>
            <div id="skill" >
                {!isLogged ? (
                    <><div className="skill-entete">
                        <img key={id} src={`http://localhost:3000/Category/{picture}`} alt="photo de la categorie" />
                        <span></span>
                        <h4>Categorie : {Category}</h4>
                        <h4>Sous categorie : {Sub_category}</h4>
                        <h4>Competence : {title}</h4>
                        <h4>Niveau : {level}</h4>
                        <h4>Prix :  {price}</h4>
                        <h4>Note : {mark}</h4>
                    </div>
                        <div className="skill-info">
                            <p>{description != null && description.length < 40 && <p>{description}</p>}
                                {description != null && description.length > 40 && <p>{description.substring(0, 40)}...</p>}</p>
                            <h4>Duree : {duration}</h4>
                            <h4>Disponibilite :{availability}</h4>
                            <h4>Transmission :{transmission}</h4>
                        </div>
                    </>
                ) : (
                    <div >
                        <h4>Professeur :{User.firstname}{User.lastname}</h4>
                        <h4>Email :{User.email}</h4>
                        <h4>Niveau d'etudes : {User.grade_level}</h4>
                        <p>Presentation :{User.presentation}</p>
                    </div>
                )
                }
            </div >
        </>
    )
};

Skill.propTypes = {

    picture: PropTypes.object,
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