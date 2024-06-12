import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";


const SearchSubCategory = ({ setValue, selectedCategory }) => {
    const { register } = useForm();
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const handleChangeSubCat = (e) => {
        const { value } = e.target;
        console.log('handleChange sub catégorie appelé: ', value);
        // if value is not defined, we set selected Category to null
        if (!value) {
            console.log("pas de sous catégorie selectionnée");
            setSelectedSubCategory(null)
            return;
        }
        // we map on the categories list to find the matching id and set our selected category in the state
        const selected = subCategories.find(subcategory => subcategory.id === parseInt(value));
        if (selected) {
            setSelectedSubCategory(selected);
            console.log('Sous Catégorie sélectionnée: ', selected);
        }
    };



    const getSubCategoriesList = useCallback(async () => {

        try {
            let endpoint = "http://localhost:3000/subCategories"

            const token = Cookies.get('token');
            const response = await fetch(endpoint, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });
            const dataSubCategories = await response.json();
            console.log("dataSubCategories apres JSON: ", dataSubCategories);
            const filteredSubCategories = selectedCategory
                ? dataSubCategories.filter(subcategory => subcategory.categoryId === selectedCategory.id)
                : dataSubCategories;
            console.log("sous catégories filtrées:", filteredSubCategories);
            setSubCategories(filteredSubCategories);


        }
        catch (error) {
            console.error("catch GetSubCategoriesList:", error);
        }
    }, [selectedCategory]);

    useEffect(() => {
        getSubCategoriesList();
    }, [getSubCategoriesList, selectedCategory]);

    return (
        <select id="SubCategoryId" name="SubCategoryId" onChange={handleChangeSubCat} {...register("SubCategoryId")}>
            <option value=""  >choisissez votre sous-categorie</option>

            {subCategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id} name={subcategory.id}>{subcategory.name}</option>
            ))}
        </select >

    )

};
export default SearchSubCategory;

