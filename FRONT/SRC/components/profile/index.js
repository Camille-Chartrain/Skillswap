import { useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import CreateSkill from "../createSkill";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error from "../error/error";



const Profile = ({ handleNotFoundError, error, setError }) => {
    const { register, handleSubmit, setValue, reset, formState: { isValid, errors } } = useForm();

    //= get method to show info & autocomplete
    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        grade_level: '',
        presentation: '',
        skill: [],
    });


    //= to fetch select's datas
    const [interests, setInterests] = useState([]);
    const handleInterestChange = (e) => {
        // console.log(interests);
        const { value, checked } = e.target;
        if (checked) {
            //-> if ok add to the list
            setInterests((prevInterests) => [...prevInterests, value]);
        } else {
            //-> else delete the choice
            setInterests((prevInterests) => prevInterests.filter((interest) => interest !== value));
        }
    };

    //= to refresh the profileData state between two changes
    const handleChangeProfile = (e) => {
        const { name, value } = e.target;
        setProfileData((prevProfileData) => ({ ...prevProfileData, [name]: value }));
        setValue(name, value);
    };

    const GetProfile = useCallback(async () => {
        // console.log('yo declenchement getprofile');
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // console.log("ICI QUON VEUT LES DATA AUSSI  response avant .json", response);
            const dataProfile = await response.json();
            // console.log("ICI QUON VEUT LES DATA response apres .json:", dataProfile);
            setProfileData(dataProfile);
            // console.log('donnees profile data du state:', profileData);

            // //= to transform us'date into french's date
            const dateUs = dataProfile.birthday;
            const dateObj = new Date(dateUs);
            const dateFr = dateObj.toLocaleDateString('fr-FR');
            // console.log("date en francais:", dateFr);
        }
        catch (error) {
            console.error("error catch:", error.message);
            setError("Erreur lors de la recuperation des donnees");
            handleNotFoundError("Erreur lors de la recuperation des donnees");
        }
    },
        []);

    useEffect(() => {
        GetProfile();
    }, [GetProfile]);


    useEffect(() => {
        //= Synchronize profileData with form values
        Object.keys(profileData).forEach(key => {
            setValue(key, profileData[key]);
        });
    }, [profileData, setValue]);


    //=post method to send info
    const ProfilePatch = async (data) => {
        try {
            console.log('data envoyees:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
                // credentials: 'include',
            })

            // console.log('response.status:', response.status);

            //=traduct api response in Json
            // console.log("response post profile avant .json", response);
            const dataProfile = await response.json();
            console.log(" response apres .json:", dataProfile);

            //=fetch back side's  errors
            // console.log("error?:", dataProfile.error);
            // setError(error);

        }
        catch (error) {
            console.error("catch profilePatch : ", error);
            setError("Erreur lors de la modification du profil");
            handleNotFoundError("Erreur lors de la modification du profil");
        }
    };

    const ProfileDelete = useCallback(async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            console.log("response avant .json", response);
            //=traduct api response from Json to JS
            const dataProfile = await response.json();
            console.log("response json analysee:", dataProfile);

            if (dataProfile === "deletion ok") {
                reset();

                // delete cookie JWT on client's side
                let token = Cookies.remove('token');
                token = null
                if (token == null) {
                    console.log("token", token);
                    navigate("/");
                }
            }
            else {
                throw new Error("Invalid response from API");
                setError(error);
            }
        }
        catch (error) {
            console.log("catch profileDelete :", error);
            setError("Le profil n'a pas pu etre supprime");
            handleNotFoundError("Le profil n'a pas pu etre supprime");
        }
    });

    //= manage skill's list user
    const [skillsUser, setSkillsUser] = useState([]);

    const GetAllSkillUser = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/skill', {
                method: "get",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

                // credentials: 'include'
            })
            // console.log('response.status:', response.status);

            //=traduct api response in Json
            // console.log("skillUser avant .json", response);
            const dataListSkill = await response.json();
            // console.log(" response apres .json:", dataListSkill);
            setSkillsUser(dataListSkill);


        }
        catch (error) {
            console.error(error.message);
            setError("Erreur d'affichage de la liste des competences");
            handleNotFoundError("Erreur d'affichage de la liste des competences");
        }
    }
    useEffect(() => { GetAllSkillUser() }, [])

    //=redirect for update skill
    const navigate = useNavigate();

    //=  skill's datas before go to skillUpDate component
    const handlechange = (skill) => {
        // console.log('handlechange: ', skill)
        const id = skill.id;
        // console.log('HC recup id:', id);
        navigate('/oneSkill/',
            {
                state: { skill }
            })
    };

    //=to delete a skill
    const PostSkillDelete = useCallback(async (skill) => {
        try {
            console.log("id recup ds le try PSD :", skill.id);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/skill/${skill.id}`, {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(skill),
                // credentials: 'include'
            })

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataSkill = await response.json();
            console.log("dataSkill ds le  PSD :", dataSkill);
            //=fetch back side's  errors
            // console.log("error?:", dataSkill.error);
            setError(dataSkill.error);
        }
        catch (error) {
            console.log("catch postSkillDelete:", error);
            setError("Impossible de sdupprimer cette competence");
            handleNotFoundError("Impossible de sdupprimer cette competence");

        }
    });



    return (




        < span className="profile" id="profile" >
            <h2 >Profil</h2>
            {error && <Error error={error} />}
            <span className="profile-section">
                <form method="POST"
                    onSubmit={handleSubmit(ProfilePatch)}>

                    <fieldset className="profileChange">
                        <legend><h3>Modifier votre profil</h3></legend>

                        <label htmlFor="firstname">Prénom* :</label>
                        <input id="firstname" type="text" name="firstname" {...register("firstname")} defaultValue={profileData.firstname || ''} onChange={handleChangeProfile} size="25" required />

                        <label htmlFor="lastname">Nom* :</label>
                        <input id="lastname" type="text" name="lastname"{...register("lastname")} defaultValue={profileData.lastname || ''} onChange={handleChangeProfile} size="25" required />

                        <label htmlFor="birthday">Date de naissance :</label>
                        <input id="birthday" type="date" name="birthday" {...register("birthday")} defaultValue={profileData.birthday || ''} onChange={handleChangeProfile} size="25" />

                        <label htmlFor="grade_level">Niveau d'etude :</label>
                        <input id="grade_level" type="text" name="grade_level" {...register("grade_level")} defaultValue={profileData.grade_level || ''} onChange={handleChangeProfile} size="25" />

                        <label htmlFor="presentation">Presentez vous :</label>
                        <textarea id="presentation" name="presentation" {...register("presentation")} defaultValue={profileData.presentation || ''} onChange={handleChangeProfile} rows="5" cols="33" />

                        {/* <label htmlFor="email">Email * :</label>
                        <input  id="email" type="email"  name="email" {...register("email")}  onChange={handleChangeProfile}size="35" placeholder="  monadresse@gmail.com" required /> */}

                        {/* //=section in place for later version 2
                        <>
                            <label htmlFor="password">Modifier mot de passe :</label>
                            <input id="password" type="password"  name="password" {...register("newPassword")}  onChange={handleChangeProfile}size="35" placeholder="  12 caracteres minimun" />
                            <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                            <input  id="password" type="password" name="confPassword" {...register("confPassword")}  onChange={handleChangeProfile}size="35" />
                        </> */}

                        <fieldset className="interest" {...register("interests")} defaultValue={interests} >
                            <legend><h4>Centres d'interets</h4></legend>
                            <span>
                                <input id="1" type="checkbox" defaultValue="1"  {...register("interests")} checked={profileData.interests && profileData.interests.includes("1")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="1">Language</label>
                            </span><span>
                                <input id="2" type="checkbox" defaultValue="2"  {...register("interests")} checked={profileData.interests && profileData.interests.includes("2")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="2">Bricolage</label>
                            </span>  <span>
                                <input id="3" type="checkbox" defaultValue="3"  {...register("interests")} checked={profileData.interests && profileData.interests.includes("3")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="3">DIY</label>
                            </span> <span>
                                <input id="4" type="checkbox" defaultValue="4" {...register("interests")} checked={profileData.interests && profileData.interests.includes("4")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="4">Cuisine</label>
                            </span><span>
                                <input id="5" type="checkbox" defaultValue="5"   {...register("interests")} checked={profileData.interests && profileData.interests.includes("5")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="5">Art</label>
                            </span> <span>
                                <input id="6" type="checkbox" defaultValue="6"   {...register("interests")} checked={profileData.interests && profileData.interests.includes("6")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="6">Scolaire</label>
                            </span>
                        </fieldset>

                        <button type="submit" disabled={!isValid} >VALIDER</button>
                    </fieldset>
                </form>

                <CreateSkill
                    handleSubmit={handleSubmit}
                    register={register} reset={reset}
                    GetAllSkillUser={GetAllSkillUser}
                />
            </span>
            < span className="skillsList" >
                <h3>Liste des competences</h3>
                <ul>
                    {skillsUser?.map((skill) => (
                        <>
                            <li key={skill?.id} className="skillList-li">

                                <span className="title">{skill?.title}</span>
                                <span className="btn">
                                    <button className="orangeBtn" onClick={handlechange.bind(null, skill)}>MODIFIER</button>
                                    <button className=
                                        "redBtn" aria-label="bouton supprimer competence" onClick={PostSkillDelete.bind(null, skill)} type="reset" >SUPPRIMER</button>
                                </span>

                            </li >
                        </>
                    ))
                    }
                </ul>
            </span >
            <button onClick={ProfileDelete} type="reset" className="redBtnProfile" size="30" >SUPPRIMER LE COMPTE</button>
        </span >
    )
}




export default Profile;