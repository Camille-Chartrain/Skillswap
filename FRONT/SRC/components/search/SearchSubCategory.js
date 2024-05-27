import { useState } from "react";


const SearchSubCategory = () => {

    const [searchSubCategory, setSearchSubCategory] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchSubCategory(e.target.value);
    }



    return (
        <>
            <select id="subCategory" value="all" name="subCategory" onChange={handleChange} aria-label="selectionner par sous-categorie">
                <option value="all" >Sous-categorie</option>

                {searchSubCategory?.map((Sub_category, id) => {
                    return (
                        <option key={Sub_category.id} value={dataSubCategory}>{subCategory}</option>
                    )
                })}

                {/* <select id="subCategories" name="subCategories" value="all"> */}
                <option value="all" >choisissez votre sous-categorie</option>

                <option value="">---------------sous-categorie Language---------------</option>

                <option value="2" >Grammaire et orthographe</option>
                <option value="3" >Langage des signes</option>
                <option value="1" >Langues etrangeres</option>
                <option value="4" >Linguistique</option>
                <option value="5" >Redaction creative</option>
                <option value="6" >Traduction et interpretation</option>

                <option value="">---------------sous-categorie Bricolage---------------</option>

                <option value="2" >Electricite domestique</option>
                <option value="11">Jardinage</option>
                <option value="7" >Menuiserie</option>
                <option value="10">Peinture et decoration intérieure</option>
                <option value="9">Plomberie</option>
                <option value="12">Reparation appareils electroniques</option>

                <option value="">---------------sous-categorie DIY---------------</option>
                <option value="18" >Artisanat ecologique (produits maison...)</option>
                <option value="15" >Construction de modeles réduits</option>
                <option value="14" >Couture et artisanat textile</option>
                <option value="16" >Creation de bijoux</option>
                <option value="13" >Fabrication de meubles</option>
                <option value="17" >Produits de beaute maison</option>

                <option value="">--------------- sous-categorie Cuisine---------------</option>
                <option value="20" >Patisserie et desserts</option>
                <option value="23">Rapide et pratique</option>
                <option value="24">Regimes specifiques (sans gluten, etc.)</option>
                <option value="19" >Regionale (italienne, etc.)</option>
                <option value="22" >Techniques de decoupe et de preparation</option>
                <option value="21">Vegetalien ou vegetarien</option>

                <option value="">--------------- sous-categorie Art---------------</option>
                <option value="28" >Art numérique</option>
                <option value="29" >Artisanat traditionnel (poterie, tissage, etc.)</option>
                <option value="30" >Histoire  et appreciation artistique</option>
                <option value="25">Dessin et peinture</option>
                <option value="27" >Photographie</option>
                <option value="26" >Sculpture</option>

                <option value="">--------------- sous-categorie Scolaire ---------------</option>
                <option value="33">Histoire et geographie</option>
                <option value="34">Litterature et analyse de texte</option>
                <option value="31">Mathematiques</option>
                <option value="36">Methodes de travail et organisation scolaire </option>
                <option value="35" >Preparation aux examens (SAT, ACT, BAC, etc.)</option >
                <option value="32">Sciences (physique, chimie, biologie)</option>

            </select >
        </>
    )


}
export default SearchSubCategory;