import Skill from './skill/index.js';
// import { isLogged } from '../../util.js';
import { useEffect, useState } from 'react';


//= details' skills are totally show only when the user is logged


const SkillList = () => {

    const [skillsList, setSkillsList] = useState([]);

    // const GetAllSkill = async (data) => {
    //     try {
    //         console.log('try data:', data);
    //         const token = Cookies.get('token');
    //         const response = await fetch('http://localhost:3000/', {
    //             method: "get",
    //             status: 200,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(data),
    //             credentials: 'include'
    //         })
    //         console.log('response.status:', response.status);

    //         //=traduct api response in Json
    //         console.log("response avant .json", response);
    //         const dataSkill = await response.json();
    //         console.log(" response apres .json:", dataSkill);
    //         setSkillsList(dataSkill);

    //         //=fetch back side's  errors
    //         console.log("error?:", dataSkill.error);
    //         // setError(dataSkill.error);

    //         {/* //= manage and show error for user */ }
    //         if (dataSkill.error) {
    //             return <div className="error">{dataSkill.error.message}</div>;
    //         } else {
    //             return <div className="success">Votre profile a été modifié</div>;
    //         }
    //     }
    //     catch (error) {
    //         console.error(error.message);
    //     }
    // }

    const GetSkillsList = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/`);
            const dataSkill = await response.json();
            setSkillsList(dataSkill);
            console.log(dataSkill);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { GetSkillsList() }, [])

    return (
        <div className='container'>
            {
                skillsList?.map((item) => (

                    < Skill
                        key={item?.id}
                        picture={item?.Category.picture}
                        title={item?.title}
                        price={item?.price}
                        mark={item?.mark}
                        level={item?.level}
                        duration={item?.duration}
                        transmission={item?.transmission}
                        description={item.description}
                        availability={item?.availability}
                        Category={item.Category.name}
                        Sub_category={item?.Sub_category?.name}
                        firstname={item?.User.firstname}
                        lastname={item?.User.lastname}
                        email={item?.User.email}
                        grade_level={item?.User.grade_level}
                        presentation={item?.User.presentation}
                    />
                ))
            }
        </div >
    )

}
export default SkillList;



