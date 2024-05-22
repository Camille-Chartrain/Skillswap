
import { useState } from "react";


const SearchLevel = () => {

    const [searchLevel, setSearchLevel] = useState('all');

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchLevel(e.target.value);
    }


    return (
        <select id="level" value="all" name="level" onChange={handleChange} aria-label="selectionner par niveau">
            <option value="all"
            >Niveau</option>
            {/* {searchLevel?.map((level, index) => {
                return (
                    <option key={index} value={dataLevel}>{level}</option>
                )
            })} */}
            {/* <select id="level" name="level" onChange={handleChange} value="default"> */}
            <option value="all" >choisissez votre niveau</option>
            <option value="" >Debutant</option>
            <option value="" >Intermediaire</option>
            <option value="" >Avance</option>
        </select>
    )
}
export default SearchLevel;