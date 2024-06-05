import Skill from './skill/index.js';
// import { isLogged } from '../../util.js';
import { useEffect, useState } from 'react';


//= details' skills are totally show only when the user is logged


const SkillList = () => {

    const [skillsList, setSkillsList] = useState([]);

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
                        SubCategory={item?.SubCategory?.name}
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



