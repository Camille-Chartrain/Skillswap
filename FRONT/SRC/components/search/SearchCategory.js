import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

const SearchCategory = () => {
    const { register } = useForm();

    //= to fetch select's datas and datas bdd
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // //= to refresh the Skill Data state between two changes
    const handleChangeCat = (e) => {
        const { value } = e.target;
        console.log('handleChange appelé: ', value);
        // if value is not defined, we set selected Category to null
        if (!value) {
            console.log("pas de category selectionnée");
            setSelectedCategory(null)
            return;
        }
        // we map on the categories list to find the matching id and set our selected category in the state
        const selected = categories.find(category => category.id === parseInt(value));
        if (selected) {
            setSelectedCategory(selected);
            console.log('Catégorie sélectionnée: ', selected);
        }
    };

    const getCategoriesList = useCallback(async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/categories`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const dataCategories = await response.json();
            setCategories(dataCategories);
            console.log("recup liste des cat après JSON:", dataCategories);
        }
        catch (error) {
            console.error("catch GetCategoriesList:", error.message);
        }
    }, []);

    useEffect(() => {
        getCategoriesList();
    }, [getCategoriesList]);

    return (
        <select name="CategoryId" id="CategoryId" onChange={handleChangeCat} {...register("CategoryId", { onChange: handleChangeCat })}>
            <option value="">Choisissez une catégorie</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    );
}

export default SearchCategory;


