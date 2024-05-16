
import { useState } from "react";


const SearchLevel = () => {

    const [searchLevel, setSearchLevel] = useState('all');

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchLevel(e.target.value);
    }


    return (
        <select id="level" name="level" onChange={handleChange}>
            <option value="all" selected>choisissez votre niveau</option>
            {/* {searchLevel?.map((level, index) => {
                return (
                    <option key={index} value={dataLevel}>{level}</option>
                )
            })} */}
            {/* <select id="level" name="level" onChange={handleChange}> */}
            <option value="" selected>choisissez votre niveau</option>
            <option value="" selected>Debutant</option>
            <option value="" selected>Intermediaire</option>
            <option value="" selected>Avance</option>
        </select>
    )
}
export default SearchLevel;