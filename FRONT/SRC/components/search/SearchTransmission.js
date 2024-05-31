import { useForm } from "react-hook-form";
import { useState } from "react";

const SearchTransmission = ({ handleSubmit, register, isValid }) => {

    //= to fetch select's datas and datas bdd
    const [selectTrans, setSelectTrans] = useState((''));
    const handleChangeTransm = (e) => { setSelectTrans(e.target.value) };

    return (

        <select id="transmission" name="transmission" {...register("transmission")} value={selectTrans} onChange={handleChangeTransm} required >
            <option id="transmission" value="all" selected>mode de transmission</option>
            <option id="transmission" value="online">En ligne</option>
            <option id="transmission" value="video">Video</option>
            <option id="transmission" value="email">Email</option>
        </select>
    )
}
export default SearchTransmission;