import { useState, useEffect } from "react";



const SearchSubCategory = ({ register }) => {

    //= to fetch select's datas and datas bdd
    const [selectSubCat, setSelectSubCat] = useState({
        id: [],
        name: '',
    });
    const handleChangeSubCat = (e) => { setSelectSubCat(e.target.value) };

    const [selectCat, setSelectCat] = useState({ id: [] });






    const getSubCategoriesList = async () => {
        try {
            console.log("try recup selecCat id ", selectCat.id);
            const response = await fetch(`http://localhost:3000/subCategories/${selectCat.id}?`);
            const dataSubCategories = await response.json();

            setSelectCat(dataSubCategories);
            console.log(dataSubCategories);
        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error.message);
        }
    }

    // useEffect(() => { getSubCategoriesList() }, []);

    return (
        <>
            <select id="SubCategoryId" name="SubCategoryId" {...register("SubCategoryId")} value={selectSubCat} onChange={handleChangeSubCat}>

                <option defaultValue=""  >choisissez votre sous-categorie</option>

                {selectCat === selectSubCat.categoryId ? (
                    selectSubCat.map((selectSubCat) => (
                        <option key={selectSubCat.id} value={selectSubCat.id}>{selectSubCat.name}</option>
                    ))
                ) : (
                    <option value="all"> {selectSubCat.name}</option>
                )
                }
            </select >
        </>
    )

};
export default SearchSubCategory;
