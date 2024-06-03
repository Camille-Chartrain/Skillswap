
import { useState } from "react";


const SearchLevel = ({ register }) => {

    //= to fetch select's datas and datas bdd

    const [selectLevel, setSelectLevel] = useState('all');
    const handleChangeLevel = (e) => { setSelectLevel(e.target.value) };



    return (
        <select id="level" name="level" {...register("level")} value={selectLevel} required onChange={handleChangeLevel}>
            <option value="all" selected>ajoutez un niveau</option>
            <option value="debutant" >Debutant</option>
            <option value="intermidiare" >Intermediaire</option>
            <option value="avance" >Avance</option>
        </select>
    )
}
export default SearchLevel;