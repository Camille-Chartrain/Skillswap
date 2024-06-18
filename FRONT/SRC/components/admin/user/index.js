
import PropTypes from 'prop-types';


const User = ({
    firstname,
    lastname,
    birthday,
    email,
    grade_level,
    presentation,
    interests
}) => {


    return (
        <>
            <span id="user" >

                <span className="user-info">
                    <h4>Prenom : </h4> <span>{firstname}</span>
                    <h4>Nom : </h4><span>{lastname}</span>
                    <h4>Date de naissance : </h4><span>{birthday}</span>
                    <h4>Email : </h4><span>{email}</span>
                    <h4>Niveau d'etudes :</h4><span>{grade_level}</span>
                    <h4>Presentation :</h4> <span>{presentation}</span>
                </span >
                <span className="user-skill">
                    <skillList /> //*a voir si possible
                    <Money />//*a voir si possible
                </span>

            </span>
        </>
    )
};

User.propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthday: PropTypes.date,
    email: PropTypes.string,
    grade_level: PropTypes.string,
    presentation: PropTypes.string,
    interests: PropTypes.string,

}

export default User;