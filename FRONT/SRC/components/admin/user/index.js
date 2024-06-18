import PropTypes from 'prop-types';
import Error from '../../error/error';
import SkillList from '../../skillList/index';
import Money from '../../statistic/money';
import { useLocation, useNavigate } from 'react-router-dom';


const User = ({
    id,
    firstname,
    lastname,
    birthday,
    email,
    grade_level,
    presentation,
    createdAt,
    error,
    setError,
    handleNotFoundError,
    handleLogout
}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    console.log("user ds Skill avant le state:", user);
    const [oneUser, setOneUser] = useState(user || {
        id: [],
        title: '',
    })

    //=post method to send info
    const UserPatch = async (data, setError, error, handleNotFoundError) => {

        try {
            console.log('data envoyees:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/user/${user.id}`, {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
                // credentials: 'include',
            })

            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response post User avant .json", response);
            const dataUser = await response.json();
            console.log(" response apres .json:", dataUser);

            //=fetch back side's  errors
            // console.log("error?:", dataUser.error);
            // setError(error);

        }
        catch (error) {
            console.error("catch UserPatch : ", error);
            setError("Erreur lors de la modification de l'utilisateur");
            handleNotFoundError("Erreur lors de la modification de l'utilisateur");
        }
    };

    return (
        <>
            <span className='ancre'>
                <>
                    <a href="/admin" alt=" admin " ><img className="" src={dashboard} alt='icone de admin' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleLogout} />
                </>
            </span>

            {error && <Error error={error} />}
            <span id="user" >

                <span className="user-info">
                    <h4>Prenom : </h4> <span>{firstname}</span>
                    <h4>Nom : </h4><span>{lastname}</span>
                    <h4>Date de naissance : </h4><span>{birthday}</span>
                    <h4>Email : </h4><span>{email}</span>
                    <h4>Niveau d'etudes : </h4><span>{grade_level}</span>
                    <h4>Presentation : </h4> <span>{presentation}</span>
                    <h4>Date de creation: </h4> <span>{createdAt}</span>
                </span>
                <span className="user-skill">
                    <skillList /> //*a voir si possible
                    <Money />//*a voir si possible
                </span>
                <button onClick={UserPatch} className="orangeBtn">MODIFIER</button>
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


}

export default User;