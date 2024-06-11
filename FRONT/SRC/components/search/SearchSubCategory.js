import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";


const SearchSubCategory = (setValue) => {
    const { register, handleSubmit } = useForm();

    const location = useLocation();
    const selectCat = location.state?.selectCat;

    //= to fetch select's datas and datas bdd
    const [selectSubCat, setSelectSubCat] = useState([
    ]);


    console.log("try recup selecSubCat ", selectSubCat);
    console.log("try recup selecCat ", selectCat);

    const handleChangeSubCat = (e) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSelectSubCat((prevSelectCat) => ({
            ...prevSelectCat,
            [name]: value,
        }));
        setValue(name, value);
    };

    useEffect(() => {
        if (selectCat) {
            getSubCategoriesList();
        }
    }, [selectCat]);


    const getSubCategoriesList = async () => {
        console.log("selectCat avant try:", selectCat);
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/subCategories/${selectCat.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            const dataSubCategories = await response.json();
            console.log("dataSubCategories avant JSON: ", dataSubCategories);
            setSelectSubCat(dataSubCategories);
            console.log("dataSubCategories apres JSON: ", dataSubCategories);

            //= update recup's values
            Object.keys(dataSubCategories).forEach(key => {
                setValue(key, dataSubCategories[key]);
            });

        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error);
        }
    };


    return (
        <>
            {selectCat === true ? (
                <select id="SubCategoryId" name="SubCategoryId" onChange={handleChangeSubCat.bind(null, setSelectSubCat)}>
                    <option value=""  >choisissez votre sous-categorie</option>
                    {
                        selectSubCat.map((selectSubCat) => (
                            <option key={selectSubCat.id} value={selectSubCat.id}>{selectSubCat.name}</option>
                        ))
                    }
                </select >

            ) : (
                <option value="all"> {selectSubCat.name}</option>
            )
            }
        </>
    )

};
export default SearchSubCategory;

