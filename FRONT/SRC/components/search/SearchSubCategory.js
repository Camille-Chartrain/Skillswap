import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';


const SearchSubCategory = (selectCat) => {
    const { register, handleSubmit } = useForm();

    //= to fetch select's datas and datas bdd
    const [selectSubCat, setSelectSubCat] = useState([selectCat||{
        id: [],
        name: '',
        Category_id: [],
    }]);
    console.log("try recup selecSubCat id ", selectSubCat.id);
    console.log("try recup selecCat ", selectCat);

    const handleChangeSubCat = (e) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSelectSubCat((prevSelectSubCat) => ({
            ...prevSelectSubCat,
            [name]: value,
        }));
        // setValue(name, value);
    };


    const getSubCategoriesList = async ( selectCat) => {
        console.log("selectCat id avant try:", selectCat);
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/subCategories/${selectCat.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`,
                },
                // credentials: 'include'
            });       
            const dataSubCategories = await response.json();
            console.log("dataSubCategories avant JSON: ", dataSubCategories);
            setSelectSubCat(dataSubCategories);
            console.log("dataSubCategories apres JSON: ",dataSubCategories);
        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error.message);
        }
    };

    useEffect(() => { getSubCategoriesList()}, []);

    return (
            <select id="SubCategoryId" name="SubCategoryId" onSubmit={handleSubmit(getSubCategoriesList.bind(null,selectSubCat))}>
                <option value="">Choisissez votre sous-categorie</option>
                
                {selectSubCat.map((subCategory) => {                   
                    <option key={subCategory.id} value={subCategory.id}{...register("subCategory.id")} name={"subCategory.id"} onChange={handleChangeSubCat}> {subCategory.name}</option>   
                })}
                
            </select>
    )

};
export default SearchSubCategory;


// //=spag
// <select id="SubCategoryId" name="SubCategoryId" onSubmit={handleSubmit(getSubCategoriesList)}>
//     <option value=""  >choisissez votre sous-categorie</option>
//     {selectCat.map((category) => (
//         <option id={category.id} key={category.id} value={category.id} {...register("category.id")} name={"category.id"} onChange={handleChangeCat}> {category.name}</option>
                    
//                     {
//             selectSubCat.map((selectSubCat) => (
//                 <option key={selectSubCat.id} value={selectSubCat.id}>{selectSubCat.name}</option>
//             ))
//         }
//     ))}

//     ) : (
//     <option value="all"> {selectSubCat.name}</option>
//     )
//                 }
// </select >