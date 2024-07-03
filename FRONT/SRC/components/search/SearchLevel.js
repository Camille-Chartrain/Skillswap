
import { useState } from "react";
import Error from '../error/error';


const SearchLevel = ({ register, setSelectLevel, selectLevel, setError, error, handleNotFoundError }) => {

    //= to fetch select's datas and datas bdd

    // const [selectLevel, setSelectLevel] = useState('all');

    const handleChangeLevel = (e) => {
        console.log("e.target.value", e.target.value);
        setSelectLevel(e.target.value);
        setError("Selectionnez un niveau");
        handleNotFoundError("Selectionnez un niveau");
    };



    return (
        <>
            {error && <Error error={error} />}
            <select id="level"
                name="level"
                {...register("level", { onChange: handleChangeLevel })}
                value={selectLevel}
                onChange={handleChangeLevel}
                aria-label="ajouter un niveau"
            // required onChange={handleChangeLevel}
            >
                <option Value="" >Un niveau</option>
                <option value="débutant" >Débutant</option>
                <option value="intermediaire" >Intermédiaire</option>
                <option value="avancé" >Avancé</option>
            </select>
        </>
    )
}
export default SearchLevel;