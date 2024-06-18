import Skill from './skill/index.js';
import { useEffect, useState } from 'react';
import Error from '../error/error.js';



//= details' skills are totally show only when the user is logged


const SkillList = ({ dataSearch, match, noMatch, title, error, setError, handleNotFoundError }) => {

    const [skillsList, setSkillsList] = useState([]);

    const { rows = [] } = dataSearch;

    console.log("state dataSearch dans Home/skillList", dataSearch);
    console.log("state match dans Home/SkillList", match);
    console.log("state noMatch dans Home/SkillList", noMatch);

    const GetSkillsList = async () => {
        try {
            const response = await fetch(`http://localhost:3000/`);
            const dataSkill = await response.json();
            setSkillsList(dataSkill);
            console.log("reponse dataSkill du get skill page home", dataSkill);
        }
        catch (error) {
            console.error(error.message);
            setError("Votre demmande n'a pas ete prise en compte");
            handleNotFoundError("Votre demande n'a pas ete prise en compte");
        }
    }

    useEffect(() => { GetSkillsList() }, [])
    const skillsToDisplay = match ? rows : skillsList;

    return (
        <span className='section'>
            {error && <Error error={error} />}
            {match && dataSearch.resultCount == 1 && (<p className="search-result">{dataSearch.resultCount} résultat</p>)}
            {match && dataSearch.resultCount > 1 && (<p className="search-result">{dataSearch.resultCount} résultats</p>)}
            {noMatch && <p className="search-result">Pas encore de cours pour vos critères, voici nos dernières nouveautés:</p>}

            {skillsToDisplay?.map((item) => (
                < Skill
                    key={item?.id}
                    skillId={item?.id}
                    picture={item?.Category?.picture}
                    title={item?.title}
                    price={item?.price}
                    averageMark={item?.averageMark}
                    level={item?.level}
                    duration={item?.duration}
                    transmission={item?.transmission}
                    description={item.description}
                    availability={item?.availability}
                    Category={item.Category?.name}
                    SubCategory={item?.SubCategory?.name}
                    firstname={item?.User?.firstname}
                    lastname={item?.User?.lastname}
                    email={item?.User?.email}
                    grade_level={item?.User?.grade_level}
                    presentation={item?.User?.presentation}
                    meeting={item?.Meetings?.length > 0 ? item.Meetings[0].status : 'N/A'}
                />

            ))}

        </span>
    );
}



export default SkillList;



