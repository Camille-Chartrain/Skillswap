
import { useEffect, useState } from "react";


const SearchLevel = () => {

    const [searchLevel, setSearchLevel] = useState('all');

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchLevel(e.target.value);
    }
    const GetLevel = async () => {
        try {
            const response = await fetch("http://localhost:3000/search");
            const dataLevel = await response.json();
            setSearchLevel(dataLevel)
        }
        catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => { GetLevel(), [searchLevel] })

    return (
        <select id="level" name="level" onChange={handleChange}>
            <option value="all" selected>choisissez votre niveau</option>
            {searchLevel?.map((level, index) => {
                return (
                    <option key={index} value={dataLevel}>{level}</option>
                )
            })}
        </select>
    )
}
export default SearchLevel;