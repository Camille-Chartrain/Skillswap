import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import SearchSubCategory from './SearchSubCategory';
import Cookies from 'js-cookie';
import Error from '../error/error';
const SearchCategory = ({ setSelectedCategory, setSelectedSubCategory, selectedCategory, selectedSubCategory, error, setError, handleNotFoundError }) => {
    const { handleSubmit, register } = useForm();

    //= to fetch select's datas and datas bdd
    const [categories, setCategories] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState(null);

    // //= to refresh the Skill Data state between two changes
    const handleChangeCat = (e) => {
        console.log('dans les handlechangeCat');
        setSelectedCategory(e.target.value)
        const { value } = e.target;
        console.log('handleChange appelé: ', value);

        //= if value is not defined, we set selected Category to null
        if (!value) {
            // console.log("pas de category selectionnée");
            setSelectedCategory(null)
            return;
        }
        //= we map on the categories list to find the matching id and set our selected category in the state
        const selected = categories.find(category => category.id === parseInt(value));
        if (selected) {
            console.log("selected dans handleChangeCat", selected);
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
            // console.log("recup liste des cat après JSON:", dataCategories);
        }
        catch (error) {
            console.error("catch GetCategoriesList:", error.message);
            setError("Selectionnez une categorie");
            handleNotFoundError("Selectionnez une categorie");
        }
    }, []);

    useEffect(() => {
        getCategoriesList();
    }, [getCategoriesList]);

    return (
        <span className="categories">
            {error && <Error error={error} />}
            <select name="CategoryId"
                id="CategoryId"
                onChange={handleChangeCat}
                {...register("CategoryId", { onChange: handleChangeCat })}
                aria-label='ajouter une categorie'
            >
                <option
                    value="">Une catégorie
                </option>

                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <SearchSubCategory
                handleSubmit={handleSubmit}
                register={register}
                selectedCategory={selectedCategory}

                setSelectedSubCategory={setSelectedSubCategory}
                selectedSubCategory={selectedSubCategory}
            />
        </span >
    );
}

export default SearchCategory;


