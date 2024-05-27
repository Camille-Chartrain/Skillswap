import { useState } from "react";

const SearchCategory = () => {

    const [searchCategory, setSearchCategory] = useState('all');


    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchCategory(e.target.value);
    }

    return (
        <select id="category" value="all" name="category" onChange={handleChange} aria-label="selectionner par categorie">
            <option value="all" >Categorie</option>

            {/* {searchCategory?.map((category, index) => {
                return (
                    <option key={index} value={dataCategory}>{category}</option>
                )
            })} */}

            {/* <select id="categories" name="categories" value="all">
                <option value="all" >choisissez votre categorie</option>
                <option value="1" >Language</option>
                <option value="2" >Bricolage</option>
                <option value="3" >Produits DIY</option>
                <option value="4" >Cuisine</option>
                <option value="5" >Art</option>
                <option value="6" >Scolaire</option> */}
        </select>



    )
}
export default SearchCategory;