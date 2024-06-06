import { useCallback, useState, useEffect } from "react";


const SearchCategory = ({ register }) => {

    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState([]);

    const handleChangeCat = useCallback((e) => { setSelectCat(e.target.value); }, [setSelectCat]);

    const getCategoriesList = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/`);
            const dataCategories = await response.json();

            setSelectCat(dataCategories);
            console.log(dataCategories);
        }
        catch (error) {
            console.error("catch GetCategoriesList:", error.message);
        }
    }

    useEffect(() => { getCategoriesList() }, []);

    return (
        <>
            <select id="CategoryId" name="CategoryId" {...register("CategoryId")} value={selectCat} onChange={handleChangeCat} >
                <option defaultValue="all" name="category" >choisissez votre categorie</option>
                {selectCat?.map((category) => {
                    <option value={category?.id} >{category?.name}</option>
                })}
            </select>

            {/* <option value="2" >Bricolage</option>
            <option value="3" >Produits DIY</option>
            <option value="4" >Cuisine</option>
            <option value="5" >Art</option>
            <option value="6" >Scolaire</option> */}

        </>
    )
}
export default SearchCategory;