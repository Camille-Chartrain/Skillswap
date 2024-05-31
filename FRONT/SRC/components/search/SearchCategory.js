import { useState } from "react";
import { useForm } from "react-hook-form";
const SearchCategory = ({ register }) => {

    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState((''));
    const handleChangeCat = (e) => { setSelectCat(e.target.value) };

    return (


        <select select id="CategoryId" name="CategoryId" {...register("CategoryId")} value={selectCat} onChange={handleChangeCat} >
            <option id="CategoryId" value="all" name="category" selected>choisissez votre categorie</option>
            <option id="CategoryId" value="1" >Language</option>
            <option id="CategoryId" value="2" >Bricolage</option>
            <option id="CategoryId" value="3" >Produits DIY</option>
            <option id="CategoryId" value="4" >Cuisine</option>
            <option id="CategoryId" value="5" >Art</option>
            <option id="CategoryId" value="5" >Scolaire</option>
        </select>


    )
}
export default SearchCategory;