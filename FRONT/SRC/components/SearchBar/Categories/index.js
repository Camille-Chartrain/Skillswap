import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";


export default function Categories(
    {
        setSelectedCategory,
        optionsHTML
    }
) {

    const [categories, setCategories] = useState([]);

    async function getCategories() {
        try {
            // console.log("essai de fetch categories");
            const token = Cookies.get('token');
            const response = await fetch(`https://${process.env.REACT_APP_API_URL}/categories`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const dataCategories = await response.json();
            setCategories(dataCategories);
            // console.log("dataCategories après JSON:", dataCategories);
        }
        catch (error) {
            console.error("erreur lors de la récup des catégories:", error.message);
        }
    }

    // Je veux appeler getCategories uniquement lors du premier chargement du composant 
    // => tableau vide
    useEffect(() => {
        getCategories();
    }, [])

    const handleCategoryChange = (event) => {
        // console.log("Catégorie sélectionnée :", event.target.value);
        setSelectedCategory(event.target.value);
        // console.log("Catégorie sélectionnée :", event.target.value);
    };

    return (

        <select
            aria-label="Catégorie"
            className="searchElement"
            onChange={handleCategoryChange}
            required={optionsHTML}
        >
            <option value="">catégorie</option>

            {
                categories && categories.length > 0 && categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))
            }
        </select >
    )
}
