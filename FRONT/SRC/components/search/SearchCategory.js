import { useCallback, useState } from "react";
const SearchCategory = ({ register }) => {

    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState('all');
    const handleChangeCat = useCallback((e) => { setSelectCat(e.target.value); }, [setSelectCat]);



    return (


        <select id="CategoryId" name="CategoryId" {...register("CategoryId")} value={selectCat} onChange={handleChangeCat} >
            <option value="all" name="category" selected>choisissez votre categorie</option>
            <option value="1" >Language</option>
            <option value="2" >Bricolage</option>
            <option value="3" >Produits DIY</option>
            <option value="4" >Cuisine</option>
            <option value="5" >Art</option>
            <option value="5" >Scolaire</option>
        </select>


    )
}
export default SearchCategory;