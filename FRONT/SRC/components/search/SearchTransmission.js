import { useState } from "react";
import Error from "../error/error";

const SearchTransmission = ({ handleSubmit, register, isValid, handleNotFoundError, error, setError }) => {

    //= to fetch select's datas and datas bdd
    const [selectTrans, setSelectTrans] = useState('all');
    const handleChangeTransm = (e) => {
        setSelectTrans(e.target.value);
        //->manage errors
        setError("Merci de choisir un mode de transmission");
        handleNotFoundError("Merci de choisir un mode de transmission");
    };


    return (
        <>
            {error && <Error error={error} />}
            <select id="transmission" name="transmission" {...register("transmission")} value={selectTrans} onChange={handleChangeTransm} aria-label="ajouter un mode de transmission" required >
                <option defaultValue="all">Mode de transmission</option>
                <option value="online">En ligne</option>
                <option value="video">Video</option>
                <option value="email">Email</option>
            </select>
        </>
    )
}
export default SearchTransmission;