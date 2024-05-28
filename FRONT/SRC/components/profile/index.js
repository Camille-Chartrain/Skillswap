import { useEffect, useState } from "react";
import Skill from "../skillList/skill";
import Cookies from 'js-cookie';
import CreateSkill from "./createSkill";





const Profile = ({ handleSubmit, register, skillsList, isValid }) => {

    //= get method to show info & autocomplete
    // const [profileData, setProfileData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     birthday: '',
    //     grade_level: '',
    //     presentation: '',
    //     interest: [],
    //     skill: []
    // });

    const GetProfile = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });

            console.log('reponse fetch:', response);
            const dataProfile = await response.json();
            console.log("c ici qu'on veut:", dataProfile);
            // console.log("ICI QUON VEUT LES DATA AUSSI  response avant .json", response);
            // const dataProfile = await response.json();
            // console.log("ICI QUON VEUT LES DATA response apres .json:", dataProfile);

        }
        catch (error) {
            console.log("error catch:", error);
        }
    }
    GetProfile();


    //= to fetch select's datas
    const [interests, setInterests] = useState([]);
    const handleInterestChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            //-> if ok add to the list
            setInterests((prevInterests) => [...prevInterests, value]);
        } else {
            //-> else delete the choice
            setInterests((prevInterests) => prevInterests.filter((interest) => interest !== value));
        }
    };


    //=post method to send info
    const ProfilePost = async (data) => {
        try {

            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "post",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })



            // console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response post profile avant .json", response);
            const dataProfile = await response.json();
            console.log(" response apres .json:", dataProfile);

            //=fetch back side's  errors
            console.log("error?:", dataProfile.error);

        }
        catch (error) {
            console.log("erreur :", error);
        }
    }



    const GetProfileDelete = async (data) => {
        try {
            console.log('try data:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response avant .json", response);
            const dataProfile = await response.json();
            console.log("response apres .json:", dataProfile);

            //=fetch back side's  errors
            console.log("error?:", dataProfile.error);
            setError(dataProfile.error);

            {/* //= manage and show error for user */ }
            if (dataProfile.error) {
                return <div className="error">{dataProfile.error.message}</div>;
            } else {
                return <div className="success">Votre profile a été modifié</div>;
            }
        }
        catch (error) {
            console.log("erreur cath :", error);
        }
    }



    return (
        <>
            <div className="changeProfile">
                <h2 id="profile">Profil</h2>
                <form method="POST"
                    onSubmit={handleSubmit(ProfilePost)}
                    className="profile">

                    <fieldset className="profileChange">
                        <legend><h3>Modifier votre profil</h3></legend>

                        <label htmlFor="firstname">Prénom* :</label>
                        <input id="firstname" type="text" name="firstname" {...register("firstname")} size="25" autoComplete="on" required />

                        <label htmlFor="lastname ">Nom* :</label>
                        <input id="lastname" type="text" name="lastname"{...register("lastname")} size="25" autoComplete="on" required />

                        <label htmlFor="birthday">Date de naissance :</label>
                        <input id="birthday" type="date" name="birthday" {...register("birthday")} size="25" autoComplete="birthday" />

                        <label htmlFor="grade_level">Niveau d'etude :</label>
                        <input id="grade_level" type="text" name="grade_level" {...register("grade_level")} size="25" autoComplete="on" />

                        <label htmlFor="presentation">Presentez vous :</label>
                        <textarea id="presentation" name="presentation" {...register("presentation")} rows="5" cols="33" autoComplete="on" />

                        {/* <label htmlFor="email">Email * :</label>
                        <input  id="email" type="email"  name="email" {...register("email")} size="35" placeholder="  monadresse@gmail.com" autoComplete="on" required /> */}

                        {/* //=section in place for later version 2
                        <>
                            <label htmlFor="password">Modifier mot de passe :</label>
                            <input id="password" type="password"  name="password" {...register("newPassword")} size="35" placeholder="  12 caracteres minimun" />
                            <label htmlFor="confPassword">Confirmer votre mot de passe :</label>
                            <input  id="password" type="password" name="confPassword" {...register("confPassword")} size="35" />
                        </> */}

                        <fieldset className="interest"  >
                            <legend><h4>Centres d'interets</h4></legend>
                            <div>
                                <input id="1" type="checkbox" value="language"  {...register("1")} checked={interests.includes("language")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="1">Language</label>
                            </div><div>
                                <input id="2" type="checkbox" value="2"  {...register("bricolage")} checked={interests.includes("2")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="2">Bricolage</label>
                            </div>  <div>
                                <input id="3" type="checkbox" value="3"  {...register("DIY")} checked={interests.includes("3")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="3">DIY</label>
                            </div> <div>
                                <input id="4" type="checkbox" value="4" {...register("cooking")} checked={interests.includes("4")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="4">Cuisine</label>
                            </div><div>
                                <input id="5" type="checkbox" value="5"   {...register("art")} checked={interests.includes("5")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="5">Art</label>
                            </div> <div>
                                <input id="6" type="checkbox" value="6"   {...register("school")} checked={interests.includes("6")}
                                    onChange={handleInterestChange} />
                                <label htmlFor="6">Scolaire</label>
                            </div>
                        </fieldset>

                        <button type="submit" disabled={isValid} >VALIDER</button>
                    </fieldset>
                </form>

                <CreateSkill />
            </div >

        </>

    )

};
export default Profile;