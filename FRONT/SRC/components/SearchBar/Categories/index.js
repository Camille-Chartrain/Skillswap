import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";


export default function Categories({ selectedCategory, setSelectedCategory }) {

    const [categories, setCategories] = useState([]);


    async function getCategories() {
        try {
            // console.log("essai de fetch categories");
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
            // console.log("recup liste des cat après JSON:", dataCategories);
        }
        catch (error) {
            console.error("erreur lors de la récup des catégories:", error.message);
            // setError("Selectionnez une categorie");
            // handleNotFoundError("Selectionnez une categorie");
        }
    }

    // Je veux appeler du code lors du premier chargement du composant et pas lorsque le composant se recharge de nouveau (on limite ainsi les effets de bords et donc une boucle infinie)
    useEffect(() => {
        getCategories();
    }, [])

    const handleCategoryChange = (event) => {
        console.log("Catégorie sélectionnée :", event.target.value);
        setSelectedCategory(event.target.value);
        console.log("Catégorie sélectionnée :", event.target.value);
    };

    return (
        <select onChange={handleCategoryChange}>
            <option value="">catégorie</option>
            {
                categories && categories.length > 0 && categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))
            }
        </select >
    )
}