import { useForm } from "react-hook-form";
import { useState } from "react";

const SearchTransmission = ({ handleSubmit, register, isValid }) => {

    //= to fetch select's datas and datas bdd
    const [selectTrans, setSelectTrans] = useState('all');
    const handleChangeTransm = (e) => { setSelectTrans(e.target.value) };

    return (

        <select id="transmission" name="transmission" {...register("transmission")} value={selectTrans} onChange={handleChangeTransm} required >
            <option defaultValue="all" >mode de transmission</option>
            <option value="online">En ligne</option>
            <option value="video">Video</option>
            <option value="email">Email</option>
        </select>
    )
}
export default SearchTransmission;