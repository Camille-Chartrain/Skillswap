import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";


export default function CategoriesCheckboxes({ selectedCategories, setSelectedCategories }) {

    const [categories, setCategories] = useState([]);


    async function getCategories() {
        try {
            console.log("essai de fetch categories");
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
            console.error("erreur lors de la récup des catégories:", error.message);
            // setError("Selectionnez une categorie");
            // handleNotFoundError("Selectionnez une categorie");
        }
    }

    const handleCheckboxChange = (event) => {
        const categoryId = parseInt(event.target.value, 10);
        setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.includes(categoryId)
                ? prevSelectedCategories.filter((id) => id !== categoryId)
                : [...prevSelectedCategories, categoryId]
        );
    };

    // Je veux appeler du code lors du premier chargement du composant et pas lorsque le composant se recharge de nouveau (on limite ainsi les effets de bords et donc une boucle infinie)
    useEffect(() => {
        getCategories();
    }, [])

    // const handleCheckboxChange = (event) => {
    //     console.log("Catégorie sélectionnée :", event.target.value);
    //     // setSelectedCategory(event.target.value);
    //     console.log("event.target :", event.target);
    //     if (event.target == true) {
    //         console.log('event target true');
    //     }
    //     if (event.target == false) {
    //         console.log('event target true');
    //     }

    // };

    return (
        <>
            {categories && categories.length > 0 && categories.map((category) => {
                console.log('Category ID:', typeof category.id); // Log the ID
                return (
                    <label key={category.id}>
                        <input
                            id={category.id}
                            type="checkbox"
                            value={category.id}
                            onChange={handleCheckboxChange}
                            // includes renvoie une valeur booleenne donc je peux l'utiliser comme valeur de "checked"
                            checked={selectedCategories.includes(category.id)}
                        />
                        {category.name}
                    </label>
                );
            })}
        </>
    )
}