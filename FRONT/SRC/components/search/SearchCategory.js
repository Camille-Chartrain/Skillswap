import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

const SearchCategory = () => {
    const { register, handleSubmit } = useForm();

    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState([]);
    console.log('id depuis selectCat:', selectCat.id);



    // //= to refresh the Skill Data state between two changes
    const handleChangeCat = (e) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSelectCat((prevSelectCat) => ({
            ...prevSelectCat, [id]: value,
        }));

    };

    const getCategoriesList = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/categories`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            const dataCategories = await response.json();
            setSelectCat(dataCategories);
            console.log("recup liste des cat apres JSON:", dataCategories);
            console.log("donnees de state selectCat:", selectCat);

        }
        catch (error) {
            console.error("catch GetCategoriesList:", error.message);
        }
    };

    useEffect(() => { getCategoriesList() }, []);


    return (
        <select name="CategoryId" id="CategoryId" onSubmit={handleSubmit(getCategoriesList)}>
            <option value="">Choisissez une catégorie</option>

            {selectCat.map((category) => (
                <option id={category.id} value={category.id} {...register("category.id")} name={"category.id"} onChange={handleChangeCat}> {category.name}</option>
            ))}
        </select >
    )
}




export default SearchCategory;