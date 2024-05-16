import { useState, useEffect } from "react";

const SearchCategory = () => {

    const [searchCategory, setSearchCategory] = useState('all');


    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchCategory(e.target.value);
    }
    const GetCategory = async () => {
        try {
            const response = await fetch("http://localhost:3000/search");
            const dataCategory = await response.json();
            setSearchCategory(dataCategory)
        }
        catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => { GetCategory(), [searchCategory] })

    return (
        <select id="category" name="category" onChange={handleChange}>
            <option value="all" selected>choisissez votre categorie</option>

            {/* {searchCategory?.map((category, index) => {
                return (
                    <option key={index} value={dataCategory}>{category}</option>
                )
            })} */}

            {/* {/* <select id="categories" name="categories" > */}
            <option value="" selected>choisissez votre categorie</option>
            <option value="Language" >Language</option>
            <option value="Bricolage" >Bricolage</option>
            <option value="DIY" >Produits DIY</option>
            <option value="Cuisine" >Cuisine</option>
            <option value="Art" >Art</option>
            <option value="Scolaire" >Scolaire</option>
        </select>



    )
}
export default SearchCategory;