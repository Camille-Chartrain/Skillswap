import React, { useState, useEffect } from "react";
import Select from 'react-select';


const SearchCategory = () => {

    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState([]);

    const getCategoriesList = async () => {

        try {
            const response = await fetch(`http://localhost:3000/categories`);
            const dataCategories = await response.json();

            setSelectCat(dataCategories);
            console.log("recup liste des cat:", dataCategories);
            console.log("donnees de state selectCat:", selectCat);
        }
        catch (error) {
            console.error("catch GetCategoriesList:", error.message);
        }
    };

    useEffect(() => { getCategoriesList() }, []);

    const options = selectCat.map((category) => ([{
        value: category.id,
        label: category.name,
    }]));

    const handleChange = (selectedOption) => {
        setSelectCat(selectedOption);

        return (

            <Select
                id="CategoryId"
                name="CategoryId"
                defaultValue={options[0]}
                onChange={handleChange}
                options={options}
            >
                <option defaultValue="" name="category">
                    Choisissez votre catégorie
                </option>
            </Select >
        )
    }
}
export default SearchCategory;