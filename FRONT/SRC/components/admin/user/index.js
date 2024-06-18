import PropTypes from 'prop-types';
import Error from '../../error/error';
import dashboard from '../../../style/pictures/dashboard.svg';
import logout from '../../../style/pictures/logout.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import skillList from '../../skillList/index';


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
    handleLogout,
    register, handleSubmit, setValue, reset, isValid
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

    //= to refresh the oneUser state between two changes
    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setOneUser((prevOneUser) => ({ ...prevOneUser, [name]: value }));
        setValue(name, value);
    };

    //=post method to send info
    const UserPatch = useCallback(async (data, setError, error, handleNotFoundError) => {

        try {
            console.log('data envoyees:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/admin/${user.id}`, {
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


        }
        catch (error) {
            console.error("catch UserPatch : ", error);
            setError("Erreur lors de la modification de l'utilisateur");
            handleNotFoundError("Erreur lors de la modification de l'utilisateur");
        }
    }, []);

    //=post method to send info
    const PatchCompetence = useCallback(async (skill) => {
        try {

            console.log('try skill:', skill);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/admin/skill/${skill.id}`, {
                method: "patch",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(skill)
                // credentials: 'include'
            })

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);
            reset();
            GetAllSkillUser();
        }
        catch (error) {
            console.log("erreur cath :", error);
            setError("Erreur lors de la creation de Competence");
            handleNotFoundError("Erreur lors de la creation de Competence");
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

                <form method="POST"
                    onSubmit={handleSubmit(UserPatch)}>

                    <fieldset className="userChange">
                        <legend><h3>Modifier l'utilisateur</h3></legend>

                        <label htmlFor="firstname">Prénom :</label>
                        <input id="firstname" type="text" name="firstname" {...register("firstname")} defaultValue={oneUser.firstname || ''} onChange={handleChangeUser} size="25" />

                        <label htmlFor="lastname">Nom :</label>
                        <input id="lastname" type="text" name="lastname"{...register("lastname")} defaultValue={oneUser.lastname || ''} onChange={handleChangeUser} size="25" />

                        <label htmlFor="presentation">Presentez vous :</label>
                        <textarea id="presentation" name="presentation" {...register("presentation")} defaultValue={oneUser.presentation || ''} onChange={handleChangeUser} rows="5" cols="33" />

                        <label htmlFor="swappies">Swappies :</label>
                        <input id="swappies" type="number" name="swappies"{...register("swappies")} defaultValue={oneUser.swappies || ''} onChange={handleChangeUser} size="25" />
                        <button type="submit" disabled={!isValid} >VALIDER</button>
                    </fieldset>
                </form>
                <h4>Date de naissance : {oneUser.birthday}</h4>
                <h4>Niveau d'etude : {oneUser.grade_level}</h4>
                <h4>Email : {oneUser.email}</h4>
                <h4>Date de creation: {oneUser.createdAt}</h4>

                <span className="user-skill">
                    <h3>Liste des competences</h3>

                    {skillList && skillList.length > 0 && skillList?.rows?.map((skill) => (
                        <>
                            <h4>Titre  : {skill.title}</h4>
                            <form method="POST" onSubmit={handleSubmit(PatchCompetence)} className="skill">
                                <fieldset className="changeSkill">
                                    <label htmlFor="duration">Duree :</label>
                                    <input id="duration" type="text" name="duration" {...register("duration")} size="25" autoComplete="duration" />

                                    <label htmlFor="description">Descriptif  :</label>
                                    <textarea id="description" name="description" {...register("description")} rows="5" cols="33" autoComplete="on" required />

                                    <label htmlFor="availability">Disponibilite * :</label>
                                    <input id="availability" type="availability" name="availability" {...register("availability")} size="25" autoComplete="on" required />

                                    <button disabled={isValid} >VALIDER</button>

                                </fieldset>
                            </form>
                        </>
                    ))
                    }
                </span>
            </span >
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