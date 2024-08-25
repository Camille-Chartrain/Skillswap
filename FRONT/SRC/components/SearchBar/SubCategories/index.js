import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";


export default function SubCategories(
    {
        selectedCategory,
        setSelectedSubCategory,
        optionsHTML
    }
) {

    const [subCategories, setSubCategories] = useState([]);

    async function getSubCategories() {
        try {
            // console.log("essai de fetch subategories");
            // console.log("valeur de selectedCategory:", selectedCategory);
            const token = Cookies.get('token');
            // console.log(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/subCategories/${selectedCategory}`);
            const response = await fetch(`https://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/subCategories/${selectedCategory}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const dataSubCategories = await response.json();
            setSubCategories(dataSubCategories);
            // console.log("dataSubcategories après JSON:", dataSubCategories);
        }
        catch (error) {
            console.error("erreur lors de la récup des catégories:", error.message);
        }
    }

    // la fonction getSubCategories sera appelé au montage initial du composant
    // et à chaque fois que le state selectedCategory change de valeur
    // comme il est indiqué dans le tableau de dépendances
    useEffect(() => {
        getSubCategories();
        // console.log('selectedCategory has been updated:', selectedCategory);
    }, [selectedCategory]);

    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
        // console.log("SousCatégorie sélectionnée :", event.target.value);
    };

    return (
        <select
            aria-label="sous-catégorie"
            className="searchElement"
            onChange={handleSubCategoryChange}
            required={optionsHTML}
        >
            <option value="">sous-catégorie</option>
            {subCategories && subCategories.length > 0 && subCategories.map((subCategory) => (
                <option
                    key={subCategory.id}
                    value={subCategory.id}
                >
                    {subCategory.name}
                </option>
            ))}
        </select>
    )
}
