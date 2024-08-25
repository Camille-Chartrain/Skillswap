import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";


export default function CategoriesCheckboxes({
    selectedCategories,
    setSelectedCategories,
    loading,
    setLoading }) {


    // pour récupérer toutes les choix de categories à cocher
    // to catch all choices of category to check
    const [categories, setCategories] = useState([]);


    async function getCategories() {
        try {
            console.log("essai de fetch categories");
            const token = Cookies.get('token');
            const response = await fetch(`https://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/categories`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const dataCategories = await response.json();
            setCategories(dataCategories);
            console.log("recup liste des cat après JSON:", dataCategories);
            setLoading(false);
        }
        catch (error) {
            console.error("erreur lors de la récup des catégories:", error.message);
            // setError("Selectionnez une categorie");
            // handleNotFoundError("Selectionnez une categorie");
        }
    }

    // to put the selected categories on the state to send to the back
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



    return (

        <fieldset>
            <legend className="cat_choices">Centre d'intérets:</legend>
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
        </fieldset>
    )
}
