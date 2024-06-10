import React, { useState, useEffect } from "react";
// import Select from 'react-select';


const SearchCategory = (setValue) => {

    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState([]);

    // //= to refresh the Skill Data state between two changes
    const handleChange = (e, selectedOption) => {
        const { name, value } = e.target;
        console.log('handleChange: ', name, value);
        setSelectCat((prevSelectedOption) => ({
            ...prevSelectedOption,
            [name]: value,
        }));
        setValue(name, value);

        const getCategoriesList = async () => {

            try {
                const response = await fetch(`http://localhost:3000/categories`);
                const dataCategories = await response.json();
                setSelectCat(dataCategories);
                console.log("recup liste des cat:", dataCategories);
                console.log("donnees de state selectCat:", selectCat);

                //= update inputs' values
                Object.keys(dataCategories).forEach(key => {
                    setValue(key, dataCategories[key]);
                });

            }
            catch (error) {
                console.error("catch GetCategoriesList:", error.message);
            }
        };

        useEffect(() => { getCategoriesList() }, []);

        // const options = selectCat.map((category) => ({
        //     value: category.id,
        //     label: category.name,
        // }));

        // const handleChange = (selectedOption) => {
        //     setSelectCat(selectedOption);

        return (
            <select name="CategoryId" id="">
                {selectCat.map((category) => (
                    <>
                        <div key={category.id}>
                            <option
                                id="CategoryId"
                                {...register("CategoryId")}
                                onChange={handleChange.bind(null, selectCat)}
                                name={category.name}
                                value={category.id}
                                placeholder="choisissez une categorie"
                            />
                        </div>

                    </>))}
            </select>
        )
    }
}
export default SearchCategory;