import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';


const SearchSubCategory = (selectCat) => {
    const { register, handleSubmit } = useForm();

    //= to fetch select's datas and datas bdd
    const [selectSubCat, setSelectSubCat] = useState([]);
    console.log("try recup selecSubCat id ", selectSubCat.id);


    const handleChangeSubCat = (e) => {
        e.preventDefault(e.target.value);
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSelectSubCat((prevSelectSubCat) => ({
            ...prevSelectSubCat,
            [id]: value,
        }));
        // setValue(name, value);
    };





    const getSubCategoriesList = async () => {
      
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/subCategories/${selectSubCat.id}?`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            const dataSubCategories = await response.json();
            setSelectSubCat(dataSubCategories);
            console.log(dataSubCategories);
        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error.message);
        }
    }

    useEffect(() => {if(selectCat){getSubCategoriesList() }} , [selectCat]);

    return (
        <>

            <select id="SubCategoryId" name="SubCategoryId">
                <option value="">Coisissez votre sous-categorie</option>
                {selectSubCat?.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}{...register("subCategory.id")} name={"subCategory.id"} onChange={handleChangeSubCat}>{subCategory.name}</option>
                ))}
                </select>
        </>
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