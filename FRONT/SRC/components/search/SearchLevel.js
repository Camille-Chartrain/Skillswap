
import { useState } from "react";


const SearchLevel = ({ register }) => {

    //= to fetch select's datas and datas bdd

    const [selectLevel, setSelectLevel] = useState((''));
    const handleChangeLevel = (e) => { setSelectLevel(e.target.value) };



    return (
        <select id="level" name="level" {...register("level")} value={selectLevel} required onChange={handleChangeLevel}>
            <option id="level" value="all" selected>ajoutez un niveau</option>
            <option id="level" value="debutant" >Debutant</option>
            <option id="level" value="intermidiare" >Intermediaire</option>
            <option id="level" value="avance" >Avance</option>
        </select>
    )
}
export default SearchLevel;