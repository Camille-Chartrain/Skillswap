
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Error from '../../error/error';
import { useLocation } from 'react-router-dom';


const SkillToSee = ({ setValue }) => {

    console.log("kikou les gens ds skillToSee");

    const location = useLocation();
    const seeASkill = location.state?.item;

    console.log("seeASkill ds Skill avant le state:", seeASkill);

    const [skillSaw, setSkillSaw] = useState(
        {
            id: [],
            Category: '',
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


    // //= to refresh the Skill Data state between two changes
    const handleChangeSkill = (e) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSkillSaw((prevSeeASkill) => ({
            ...prevSeeASkill,
            [name]: value,
        }));
        setValue(name, value);
    };



    console.log("avant fetch:", seeASkill);

    //=get method for fetch datas from the Back
    const getSkill = useCallback(async () => {
        console.log("skillSaw avt try:", seeASkill)
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


            console.log("item avt json:", skillSaw);
            const dataSkill = await response.json();

            console.log("dataSkill ds getSkill:", dataSkill);
            setSkillSaw(dataSkill.data);
            //= Synchronize profileData with form values
            Object.keys(dataSkill.data).forEach(key => {
                setValue(key, dataSkill.data[key]);
            });

        }
        catch (error) {
            console.error("catch de skillUpDate:", error);

        }
    }, [seeASkill.id]);

    useEffect(() => { getSkill() }, [])



    return (
        <section onChange={handleChangeSkill}>
            {skillSaw && (

                <div id="skill" >

                    {console.log("ds return SkillToSee:", skillSaw)}
                    {console.log("ds return SkillToSee skillSaw.id:", skillSaw.id)}
                    <div className="skill-header">
                        {/* <img src={`http://localhost:3000/${picture}`} alt="photo de la categorie" /> */}
                        <h4>Description :</h4> <span>{skillSaw.description} ` </span>
                        {console.log("skillSaw.description:", skillSaw.description)}
                        <h4>Duree :</h4><span>{skillSaw.duration}</span>
                    </div>
                    <div className="skill-info">
                        <h4>Categorie :</h4> <span>{skillSaw.Category}</span>
                        <h4>Sous categorie :</h4>  <span>{skillSaw.SubCategory}</span>
                        <h4>Competence :</h4><span> {skillSaw.title}</span>
                        <h4>Niveau : </h4><span>{skillSaw.level}</span>
                        <h4>Prix : </h4> <span>{skillSaw.price}</span>
                        <h4>Note : </h4>  <span>{
                            stars?.map((_, index) => (
                                <span key={index}
                                    style={{ color: index < skillSaw.averageMark ? 'gold' : 'gray' }} >
                                    < FontAwesomeIcon icon={faStar} />
                                </span>))}
                        </span>
                    </div>
                    <div className='skill-teacher'>
                        <h4>Disponibilite :</h4><span>{skillSaw.availability}</span>
                        <h4>Transmission :</h4><span>{skillSaw.transmission}</span>
                        <h4>Professeur :</h4> <span> {`${skillSaw.firstname} ${skillSaw.lastname}`}</span>
                        <h4>Email : </h4><span>{skillSaw.email}</span>
                        <h4>Niveau d'etudes :</h4><span>{skillSaw.grade_level}</span>
                        <h4>Presentation :</h4> <span>{skillSaw.presentation}</span>
                    </div >

                    {/* < button type="submit" onSubmit={handleChange}>SUIVRE CE COURS</button> */}
                </div >)}
        </section>
    )
};



export default SkillToSee;