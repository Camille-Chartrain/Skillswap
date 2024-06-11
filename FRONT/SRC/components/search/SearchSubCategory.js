import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";


const SearchSubCategory = ({ setValue, selectCat }) => {
    const { register, handleSubmit } = useForm();

    // const location = useLocation();
    // const selectCat = location.state?.selectCat;

    //= to fetch select's datas and datas bdd
    const [selectSubCat, setSelectSubCat] = useState([]);

    const handleChangeSubCat = (e) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSelectSubCat((prevSelectCat) => ({
            ...prevSelectCat,
            [name]: value,
        }));
        setValue(name, value);
    };



    const getSubCategoriesList = async (selectCat) => {

        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/subCategories/?CategoryId=${selectCat.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            const dataSubCategories = await response.json();
            console.log("dataSubCategories avant JSON: ", dataSubCategories);
            ;
            const subCategorySelected = selectSubCat.filter(subCat => subCat.category === selectCat)
            setSelectSubCat(subCategorySelected);
            console.log("dataSubCategories apres JSON: ", dataSubCategories);

            //= update recup's values
            Object.keys(subCategorySelected).forEach(key => {
                setValue(key, subCategorySelected[key]);
            });

        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error);
        }
    };

    useEffect(() => {
        getSubCategoriesList();
    }, [selectCat]);




    return (
        <select id="SubCategoryId" name="SubCategoryId" onChange={handleSubmit(getSubCategoriesList.bind(null, selectSubCat))}>
            <option value=""  >choisissez votre sous-categorie</option>

            {selectSubCat.map((subCat) => (
                <option key={subCat.id} value={subCat.id}{...register("subCat.id")} name={"subCat.id"} onChange={handleChangeSubCat}>{subCat.name}</option>
            ))
            }
        </select >

    )

};
export default SearchSubCategory;

