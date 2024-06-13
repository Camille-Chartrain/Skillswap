
import { useState } from "react";


const SearchLevel = ({ register, setSelectLevel, selectLevel }) => {

    //= to fetch select's datas and datas bdd

    // const [selectLevel, setSelectLevel] = useState('all');

    const handleChangeLevel = (e) => { setSelectLevel(e.target.value) };



    return (
        <select id="level"
            name="level"
            {...register("level", { onChange: handleChangeLevel })}
            value={selectLevel}
            required onChange={handleChangeLevel}
        >
            <option defaultValue="all">ajoutez un niveau</option>
            <option value="débutant" >Débutant</option>
            <option value="intermediaire" >Intermédiaire</option>
            <option value="avancé" >Avancé</option>
        </select>
    )
}
export default SearchLevel;