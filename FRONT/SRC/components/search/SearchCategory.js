import { useState } from "react";

const SearchCategory = () => {

    const [searchCategory, setSearchCategory] = useState('all');


    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchCategory(e.target.value);
    }

    return (
        <select id="category" value="all" name="category" onChange={handleChange} aria-label="selectionner par categorie">
            <option value="all" size="15" >Categorie</option>

            {/* {searchCategory?.map((category, index) => {
                return (
                    <option key={index} value={dataCategory}>{category}</option>
                )
            })} */}

            {/* {/* <select id="categories" name="categories"  value="all">  */}
            <option value="all" >choisissez votre categorie</option>
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