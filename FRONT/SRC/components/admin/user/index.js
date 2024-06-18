import PropTypes from 'prop-types';
import Error from '../../error/error';
import SkillList from '../../skillList/index';
import Money from '../../statistic/money';
import dashboard from '../../../style/pictures/dashboard.svg';
import logout from '../../../style/pictures/logout.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';


const User = ({
    id,
    firstname,
    lastname,
    birthday,
    email,
    grade_level,
    presentation,
    createdAt,
    swappies,
    count,
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
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        grade_level: '',
        presentation: '',
        createdAt: '',
        swappies: [],
        count: '',
    })

    //=post method to send info
    const UserPatch = useCallback(async (data, setError, error, handleNotFoundError) => {

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
    }, []);

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
                    <h4>Prenom : </h4> <span>{user.firstname}</span>
                    <h4>Nom : </h4><span>{user.lastname}</span>
                    <h4>Date de naissance : </h4><span>{user.birthday}</span>
                    <h4>Email : </h4><span>{user.email}</span>
                    <h4>Niveau d'etudes : </h4><span>{user.grade_level}</span>
                    <h4>Presentation : </h4> <span>{user.presentation}</span>
                    <h4>Date de creation: </h4> <span>{user.createdAt} </span>
                    <h4>Total Swappies: </h4> <span>{user.swappies}</span>
                </span>
                <span className="user-skill">
                    <skillList />
                </span>
                <button onClick={UserPatch} className="orangeBtn">VALIDER</button>
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