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
            console.log("essai de fetch subategories");
            console.log("valeur de selectedCategory:", selectedCategory);
            const token = Cookies.get('token');
            console.log(`http://localhost:3000/subCategories/${selectedCategory}`);
            const response = await fetch(`http://localhost:3000/subCategories/${selectedCategory}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const dataSubCategories = await response.json();
            setSubCategories(dataSubCategories);
            console.log("recup liste des cat après JSON:", dataSubCategories);
        }
        catch (error) {
            console.error("erreur lors de la récup des catégories:", error.message);
            // setError("Selectionnez une categorie");
            // handleNotFoundError("Selectionnez une categorie");
        }
    }

    // Je veux appeler du code lors du premier chargement du composant et pas lorsque le composant se recharge de nouveau (on limite ainsi les effets de bords et donc une boucle infinie)
    useEffect(() => {

        getSubCategories();
        console.log('selectedCategory has been updated:', selectedCategory);
    }, [selectedCategory]);

    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
        console.log("SousCatégorie sélectionnée :", event.target.value);
    };

    return (
        <select
            className="searchElement"
            onChange={handleSubCategoryChange}
            required={optionsHTML}
        >
            <option value="">sous-catégorie</option>
            {subCategories && subCategories.length > 0 && subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
            ))}
        </select>
    )
}