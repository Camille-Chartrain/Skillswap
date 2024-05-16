import { useState, useEffect } from "react";


const SearchSubCategory = () => {

    const [searchSubCategory, setSearchSubCategory] = useState('all');

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchSubCategory(e.target.value);
    }
    const GetSubCategory = async () => {
        try {
            const response = await fetch("http://localhost:3000/search");
            const dataSubCategory = await response.json();
            setSearchSubCategory(dataSubCategory)
        }
        catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => { GetSubCategory(), [searchSubCategory] })



    return (
        <select id="subCategory" name="subCategory" onChange={handleChange}>
            <option value="all" selected>choisissez votre sous-categorie</option>

            {/* {searchSubCategory?.map((subCategory, id) => {
                return (
                    <option key={id} value={dataSubCategory}>{subCategory}</option>
                )
            })} */}

            {/* // <select id="subCategories" name="subCategories"> */}
            <option value="" selected>choisissez votre sous-categorie</option>

            <option value="">---------------sous-categorie Language---------------</option>

            <option value="Grammaire et orthographe" >Grammaire et orthographe</option>
            <option value="Langage des signes" >Langage des signes</option>
            <option value="Langues etrangeres" >Langues etrangeres</option>
            <option value="Linguistique" >Linguistique</option>
            <option value="Redaction creative" >Redaction creative</option>
            <option value="Traduction et interpretation" >Traduction et interpretation</option>

            <option value="">---------------sous-categorie Bricolage---------------</option>

            <option value="Electricite domestique" >Electricite domestique</option>
            <option value="Jardinage">Jardinage</option>
            <option value="Menuiserie" >Menuiserie</option>
            <option value="Peinture et decoration intérieure">Peinture et decoration intérieure</option>
            <option value="Plomberie">Plomberie</option>
            <option value="Reparation appareils electroniques">Reparation appareils electroniques</option>

            <option value="">---------------sous-categorie DIY---------------</option>
            <option value="Artisanat ecologique" >Artisanat ecologique (produits maison...)</option>
            <option value="Construction de modeles réduits" >Construction de modeles réduits</option>
            <option value="Couture et artisanat textile" >Couture et artisanat textile</option>
            <option value="Conception de bijoux" >Creation de bijoux</option>
            <option value="Fabrication de meubles" >Fabrication de meubles</option>
            <option value="Fabrication de produits de beaute maison" >Produits de beaute maison</option>

            <option value="">--------------- sous-categorie Cuisine---------------</option>
            <option value="Patisserie et desserts" >Patisserie et desserts</option>
            <option value="Cuisine rapide et pratique">Rapide et pratique</option>
            <option value="Cuisine pour les regimes specifiques (sans gluten, sans lactose, etc.)">Regimes specifiques (sans gluten, etc.)</option>
            <option value="Cuisine regionale (italienne, asiatique, mexicaine, etc.)" >Regionale (italienne, etc.)</option>
            <option value="Techniques de decoupe et de preparation" >Techniques de decoupe et de preparation</option>
            <option value="Cuisine vegetalienne ou vegetarienne">Vegetalien ou vegetarien</option>

            <option value="">--------------- sous-categorie Art---------------</option>
            <option value="Art numérique" >Art numérique</option>
            <option value="Artisanat traditionnel (poterie, tissage, etc.)" >Artisanat traditionnel (poterie, tissage, etc.)</option>
            <option value="Histoire de l art et appreciation artistique" >Histoire  et appreciation artistique</option>
            <option value="Dessin et peinture">Dessin et peinture</option>
            <option value="Photographie" >Photographie</option>
            <option value="Sculpture" >Sculpture</option>

            <option value="">--------------- sous-categorie Scolaire ---------------</option>
            <option value="Histoire et geographie">Histoire et geographie</option>
            <option value="Litterature et analyse de texte">Litterature et analyse de texte</option>
            <option value="Mathematiques">Mathematiques</option>
            <option value="Methodes de travail et organisation scolaire">Methodes de travail et organisation scolaire </option>
            <option value="Preparation aux examens (SAT, ACT, BAC, etc.)" >Preparation aux examens (SAT, ACT, BAC, etc.)</option >
            <option value="Sciences (physique, chimie, biologie)">Sciences (physique, chimie, biologie)</option>

        </select >

    )


}
export default SearchSubCategory;