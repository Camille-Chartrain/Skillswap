
import PropTypes from 'prop-types';

const Skill = ({
    picture,
    title,
    price,
    mark,
    level,
    duration,
    transmission,
    description,
    availability,
    category,
    subCategory,
    firstname,
    lastname,
    email,
    grade_level,
    presentation }) => {
    return (
        <div id="Skill" >
            <a target="_blank" className="skill" href="">

                <span className="skill-entete"></span>
                <img src={picture} alt="photo de la categorie" />
                <h4>Categorie : {category}</h4>
                <h4>Sous categorie :{subCategory}</h4>
                <h4>Competence :{title}</h4>
                <h4>Niveau :{level}</h4>
                <h4>Prix : {price}</h4>
                <h4>Note :{mark}</h4>

                <div className="skill-info">
                    {/* //methode qui structure les descriptions:
                    //si description est non nul et si sa longeur est inf a 60 alors description normale */}
                    <p>{description != null && description.length < 60 && <p>{description}</p>}
                        {/* //si description est non nul et si sa longeur est sup a 60 alors description de 0 a 60 caracteres puis 3 points */}
                        {description != null && description.length > 60 && <p>{description.substring(0, 60)}...</p>}</p>
                    <h4>Duree : {duration}</h4>
                    <h4>Disponibilite :{availability}</h4>
                    <h4>Transmission :{transmission}</h4>

                    <h4>Professeur :{firstname}{lastname}</h4>
                    <h4>Email :{email}</h4>
                    <h4>Niveau d'etudes : {grade_level}</h4>
                    <p>Presentation :{presentation}</p>
                </div>
            </a>
        </div >
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