import { useState, useEffect } from "react";



const SearchSubCategory = ({ register, selectCat, setSelectCat }) => {

    //= to fetch select's datas and datas bdd
    const [selectSubCat, setSelectSubCat] = useState([]);
    const handleChangeSubCat = (e) => { setSelectSubCat(e.target.value) };

    const getSubCategoriesList = async () => {
        try {
            const response = await fetch(`http://localhost:3000/`);
            const dataSubCategories = await response.json();

            setSelectCat(dataSubCategories);
            console.log(dataSubCategories);
        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error.message);
        }
    }

    useEffect(() => { getSubCategoriesList() }, []);

    return (
        <>
            <select id="SubCategoryId" name="SubCategoryId" {...register("SubCategoryId")} value={selectSubCat} onChange={handleChangeSubCat}>

                <option value="all"  >choisissez votre sous-categorie</option>

                {selectCat === selectSubCat.categoryId ? (
                    subCategories.map((selectSubCat) => (
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
