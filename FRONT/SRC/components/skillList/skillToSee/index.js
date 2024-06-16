import dashboard from '../../../style/pictures/dashboard.svg';
import logout from '../../../style/pictures/logout.svg';

// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Error from '../../error/error';
import { useLocation, useNavigate } from 'react-router-dom';






const SkillToSee = ({ setValue, setIsAuthenticated }) => {

    // console.log("kikou les gens ds skillToSee");

    const location = useLocation();
    const seeASkill = location.state?.item;
    const navigate = useNavigate();
    // console.log("seeASkill ds Skill avant le state:", seeASkill);

    const [skillSaw, setSkillSaw] = useState(
        {
            id: [],
            User: '',
            Category: '',
            CategoryId: '',
            SubCategory: '',
            title: '',
            price: '',
            mark: '',
            level: '',
            duration: '',
            transmission: '',
            description: '',
            availability: '',

        })

    let stars = Array(5).fill();

    const handleLogout = async () => {

        try {
            setIsAuthenticated(false)
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
                console.log("state du isAunthenticated dans logout skilltosee ", isAuthenticated);
                navigate("/");
            }
        }
        catch (error) {
            console.log("erreur :", error);
        };
    }

    //=get method for fetch datas from the Back
    const getSkill = useCallback(async () => {
        // console.log("skillSaw avt try:", seeASkill)
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/oneSkill/${seeASkill.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch seeASkill data');
            }


            // console.log("item avt json:", skillSaw);
            const dataSkill = await response.json();

            // console.log("dataSkill ds getSkill:", dataSkill);
            setSkillSaw(dataSkill.data);
            //= Synchronize profileData with form values
            Object.keys(dataSkill.data).forEach(key => {
                setValue(key, dataSkill.data[key]);
            });

        }
        catch (error) {
            console.error("catch de skillUpDate:", error);

        }
    }, [seeASkill]);

    useEffect(() => { getSkill() }, [])

    //=post method to add course to studyList
    const AskInscriptionCourse = useCallback(async (seeASkill) => {
        try {
            console.log('dans la fonction AskInscriptionCourse');
            console.log('data envoyees:', seeASkill);
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/learning/${seeASkill.id}`, {
                method: 'POST',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(seeASkill)
                // credentials: 'include',
            })

            // console.log('response.status:', response.status);

            //=traduct api response in Json
            console.log("response post skill avant .json", response);
            const dataAdding = await response.json();
            console.log(" dataAdding  apres .json:", dataAdding);


            if (dataAdding === "cours en attente de validation") {//*message de validate

                navigate('/dashboard');
            }
            else {
                throw new Error("Invalid response from API");
            }
        }
        catch (error) {
            console.log("catch AIC : ", error);
            // handleNotFoundError();
        }
    }, [seeASkill]);

    const handleClick = (event, skillId) => {
        console.log("dans la fonction handleClick suivre ce cours");
        event.preventDefault();
        AskInscriptionCourse(seeASkill);
    }


    //= to refresh the Skill Data state between two changes
    const handleChangeSkill = (e) => {
        const { name, value } = e.target;
        // console.log('handleChange: ', name, value);
        setSkillSaw((prevSeeASkill) => ({
            ...prevSeeASkill,
            [name]: value,
        }));
        setValue(name, value);
    };



    return (
        <>
            <div className='ancre'>
                <>
                    <a href="/dashboard#profile" alt=" communication " ><img className="" src={dashboard} alt='icone de communication ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleLogout} />
                </>
            </div>


            <section onChange={handleChangeSkill} >
                <div className="section" >
                    {skillSaw && (

                        <div id="skillToSee">
                            <div className="skill-header">

                                <h4>{skillSaw.title}</h4>
                                <h4>Description :</h4> <span>{skillSaw.description} </span>
                                {/* {console.log("skillSaw.description:", skillSaw.description)} */}
                                <h4>Duree :</h4><span>{skillSaw.duration}</span>
                                <h4>Swappie : </h4> <span>{skillSaw.price}</span>
                                <h4>Note : </h4>  <span>{
                                    stars?.map((_, index) => (
                                        <span key={index}
                                            style={{ color: index < skillSaw.averageMark ? 'gold' : 'gray' }} >
                                            < FontAwesomeIcon icon={faStar} />
                                        </span>))}
                                </span>
                            </div>
                            <div className="skill-info">
                                <h4>Categorie :</h4> <span>{skillSaw.Category.name}</span>
                                <h4>Sous categorie :</h4>  <span>{skillSaw.SubCategory.name}</span>
                                <h4>Competence :</h4><span> {skillSaw.title}</span>
                                <h4>Niveau : </h4><span>{skillSaw.level}</span>

                            </div>
                            <div className='skill-teacher'>
                                <h4>Disponibilite :</h4><span>{skillSaw.availability}</span>
                                <h4>Transmission :</h4><span>{skillSaw.transmission}</span>
                                <h4>Professeur :</h4> <span> {`${skillSaw.User.firstname} ${skillSaw.User.lastname}`}</span>
                                <h4>Email : </h4><span>{skillSaw.User.email}</span>
                                <h4>Niveau d'etudes :</h4><span>{skillSaw.User.grade_level}</span>
                                <h4>Presentation :</h4> <span>{skillSaw.User.presentation}</span>
                            </div >

                            < button className="skillBtn" type="submit" onClick={(event) => handleClick(event, seeASkill.id)}>SUIVRE CE COURS</button>
                        </div >)
                    }
                </div >
            </section >

        </>
    )
};



export default SkillToSee;