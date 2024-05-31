import { useState } from "react";
import { useForm } from "react-hook-form";
import SearchCategory from "./SearchCategory";


const SearchSubCategory = ({ register }) => {


    //= to fetch select's datas and datas bdd
    const [selectCat, setSelectCat] = useState((''));
    const handleChangeCat = (e) => { setSelectCat(e.target.value) };
    const [selectSubCat, setSelectSubCat] = useState((''));
    const handleChangeSubCat = (e) => { setSelectSubCat(e.target.value) };





    return (

        <select id="SubCategoryId" name="SubCategoryId" {...register("SubCategoryId")} value={selectSubCat} onChange={handleChangeSubCat}>
            <option id="SubCategoryId" value="all" selected >choisissez votre sous-categorie</option>

            <option id="SubCategoryId" value='language'>---------------sous-categorie Language---------------</option>
            {selectCat === 1 && (
                <>
                    <option value="2" >Grammaire et orthographe</option>
                    <option value="3" >Langage des signes</option>
                    <option value="1" >Langues etrangeres</option>
                    <option value="4" >Linguistique</option>
                    <option value="5" >Redaction creative</option>
                    <option value="6" >Traduction et interpretation</option>
                </>
            )}
            <option id="SubCategoryId" value='bricolage'>---------------sous-categorie Bricolage---------------</option>
            {selectCat === 2 && (
                <>
                    <option value="8" >Electricite domestique</option>
                    <option value="11">Jardinage</option>
                    <option value="7" >Menuiserie</option>
                    <option value="10">Peinture et decoration intérieure</option>
                    <option value="9">Plomberie</option>
                    <option value="12">Reparation appareils electroniques</option>
                </>
            )}
            <option id="SubCategoryId" value='DIY'>---------------sous-categorie DIY---------------</option>
            {selectCat === 3 && (
                <>
                    <option value="18" >Artisanat ecologique (produits maison...)</option>
                    <option value="15" >Construction de modeles réduits</option>
                    <option value="14" >Couture et artisanat textile</option>
                    <option value="16" >Creation de bijoux</option>
                    <option value="13" >Fabrication de meubles</option>
                    <option value="17" >Produits de beaute maison</option>
                </>)}
            <option id="SubCategoryId" value='cooking'>--------------- sous-categorie Cuisine---------------</option>
            {selectCat === 4 && (
                <>
                    <option value="20" >Patisserie et desserts</option>
                    <option value="23">Rapide et pratique</option>
                    <option value="24">Regimes specifiques (sans gluten, etc.)</option>
                    <option value="19" >Regionale (italienne, etc.)</option>
                    <option value="22" >Techniques de decoupe et de preparation</option>
                    <option value="21">Vegetalien ou vegetarien</option>
                </>)}
            <option id="SubCategoryId" value='art'>--------------- sous-categorie Art---------------</option>
            {selectCat === 5 && (
                <>
                    <option value="28" >Art numérique</option>
                    <option value="29" >Artisanat traditionnel (poterie, tissage, etc.)</option>
                    <option value="30" >Histoire  et appreciation artistique</option>
                    <option value="25">Dessin et peinture</option>
                    <option value="27" >Photographie</option>
                    <option value="26" >Sculpture</option>
                </>)}
            <option id="SubCategoryId" value='school'>--------------- sous-categorie Scolaire ---------------</option>
            {selectCat === 6 && (
                <>
                    <option value="33">Histoire et geographie</option>
                    <option value="34">Litterature et analyse de texte</option>
                    <option value="31">Mathematiques</option>
                    <option value="36">Methodes de travail et organisation scolaire </option>
                    <option value="35" >Preparation aux examens (SAT, ACT, BAC, etc.)</option >
                    <option value="32">Sciences (physique, chimie, biologie)</option>
                </>)}
        </select >

    )


}
export default SearchSubCategory;