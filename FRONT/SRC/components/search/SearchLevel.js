
import { useState } from "react";


const SearchLevel = ({ register, setSelectLevel, selectLevel }) => {

    //= to fetch select's datas and datas bdd

    // const [selectLevel, setSelectLevel] = useState('all');

    const handleChangeLevel = (e) => {
        console.log("e.target.value", e.target.value);
        setSelectLevel(e.target.value)
    };



    return (
        <select id="level"
            name="level"
            {...register("level", { onChange: handleChangeLevel })}
            value={selectLevel}
            onChange={handleChangeLevel}
        // required onChange={handleChangeLevel}
        >
            <option defaultValue="all" value="">ajoutez un niveau</option>
            <option value="débutant" >Débutant</option>
            <option value="intermediaire" >Intermédiaire</option>
            <option value="avancé" >Avancé</option>
        </select>
    )
}
export default SearchLevel;