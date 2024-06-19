import PropTypes from 'prop-types';
import Error from '../../error/error';
import dashboard from '../../../style/pictures/dashboard.svg';
import logout from '../../../style/pictures/logout.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCallback, useState, useEffect } from 'react';
import skillList from '../../skillList/index';


const User = ({
    id,
    firstname,
    lastname,
    email,
    presentation,
    createdAt,
    swappies,
    count,
    error,
    setError,
    handleNotFoundError,
    register, handleSubmit, setValue, reset, isValid
}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const [updateUser, setUpdateUser] = useState(false)
    const [updateSkill, setUpdateSkill] = useState(false)
    const [skillsList, setSkillsList] = useState(null);
    console.log("user ds User avant le state:", user);
    const [oneUser, setOneUser] = useState(user || {
        id: [],
        firstname: '',
        lastname: '',
        email: '',
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

    const handleLogout = async () => {

        try {
            // console.log("deconnection => supprimer cookie. (composant Dashboard)");
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/logout`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            // console.log("response", response);
            const resultLogout = await response.json();
            // console.log('response component dashboard logout:', resultLogout);

            // delete cookie JWT on client's side
            let thisToken = Cookies.remove('token');
            thisToken = null
            if (thisToken == null) {
                // console.log("token", thisToken);
                navigate("/");
            }
        }
        catch (error) {
            console.log("erreur :", error);
        };
    }

    const GetAllSkillUser = useCallback(async () => {
        try {

            console.log('try GetAllSkillUser user=:', user);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/admin/${user.id}`, {
                method: "get",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify()
                // credentials: 'include'
            })

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataskills = await response.json();
            console.log(" response 'dataskills' apres .json:", dataskills);
            setSkillsList(dataskills)

        }
        catch (error) {
            console.log("erreur cath :", error);
            setError("Erreur lors de la creation de Competence");
            handleNotFoundError("Erreur lors de la creation de Competence");
        }
    }, []);
    useEffect(() => { GetAllSkillUser() }, [])

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
            if (dataUser === "update admin du profile ok") {
                console.log("datauser=", dataUser);
                setUpdateUser(true)
            }

        }
        catch (error) {
            console.error("catch UserPatch : ", error);
            // setError("Erreur lors de la modification de l'utilisateur");
            // handleNotFoundError("Erreur lors de la modification de l'utilisateur");
        }
    }, []);

    //=post method to send info
    const PatchCompetence = useCallback(async (data, skill) => {
        try {

            console.log('try skill dans patchCompetence:', skill);
            console.log('try data dans patchCompetence:', data);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/admin/skill/${skill.id}`, {
                method: "PATCH",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
                // credentials: 'include'
            })

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log(" response apres .json:", dataSkill);
            if (dataSkill === "update admin du profile ok") {
                setUpdateSkill(true)
            }
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
            <div className="oneUser">
                <span id="user" >
                    <form method="POST"
                        onSubmit={handleSubmit(UserPatch)}>
                        <fieldset className="userChange">
                            <legend><h2>Modifier l'utilisateur</h2></legend>
                            <span className="user-info">
                                <label htmlFor="firstname">Prénom :</label>
                                <input id="firstname" type="text" name="firstname" {...register("firstname")}
                                    defaultValue={oneUser.firstname || ''} onChange={handleChangeUser} size="15" />

                                <label htmlFor="lastname">Nom :</label>
                                <input id="lastname" type="text" name="lastname"{...register("lastname")}
                                    defaultValue={oneUser.lastname || ''} onChange={handleChangeUser} size="15" />
                            </span>
                            <span className="user-status">
                                <label htmlFor="presentation">Presentez vous :</label>
                                <textarea id="presentation" name="presentation" {...register("presentation")}
                                    defaultValue={oneUser.presentation || ''} onChange={handleChangeUser} rows="3" cols="20" />

                                <label htmlFor="swappies">Swappies :</label>
                                <input id="swappies" type="number" name="swappies"{...register("swappies")}
                                    defaultValue={oneUser.swappies || ''} onChange={handleChangeUser} size="5" />
                            </span>
                            <span className="user-h4">
                                <h4>Email :</h4><span> {oneUser.email}</span>
                                <h4>Date de creation: </h4><span>{oneUser.createdAt}</span>
                            </span>
                            <button type="submit" className="blueBtn"
                            // disabled={!isValid}
                            >VALIDER</button>

                            {updateUser && <span>  modifications validées </span>}
                        </fieldset>
                    </form>


                    <span className="user-skill">
                        <h2>Liste des compétences</h2>

                        {skillsList && skillsList?.rows?.length > 0 ? (
                            skillsList.rows.map((skill) => (
                                <div key={skill.id}>

                                    {console.log("skillList dans JSX=", skillsList)}
                                    <form method="POST" onSubmit={handleSubmit(PatchCompetence)} className="skill">

                                        <fieldset className="changeSkill">
                                            <h3>Titre : {skill.title}</h3>
                                            <span className="skillChange">
                                                <span className="skillChange-input">
                                                    <label htmlFor="duration">Durée :</label>
                                                    <input
                                                        id="duration"
                                                        type="text"
                                                        name="duration"
                                                        {...register("duration")}
                                                        size="15"
                                                        autoComplete="duration"
                                                    />

                                                    <label htmlFor="availability">Disponibilité :</label>
                                                    <input
                                                        id="availability"
                                                        type="availability"
                                                        name="availability"
                                                        {...register("availability")}
                                                        size="25"
                                                        autoComplete="on"
                                                        required
                                                    />
                                                </span>
                                                <label htmlFor="description">Descriptif :</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    {...register("description")}
                                                    rows="5"
                                                    cols="33"
                                                    autoComplete="on"
                                                    required
                                                />

                                            </span>

                                            <button disabled={isValid}>VALIDER</button>
                                            {updateSkill && <span>  modifications validées </span>}
                                        </fieldset>
                                    </form>
                                </div>
                            ))
                        ) : (
                            <p>Aucune compétence trouvée.</p>
                        )}
                    </span>

                </span >
            </div>
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