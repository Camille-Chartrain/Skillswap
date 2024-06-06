import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import SearchSubCategory from './SearchSubCategory';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from './logo.png';
import SearchTransmission from './SearchTransmission';

const Search = ({ setSearchLevel, setSearchCategory, setSearchSubCategory }) => {

    const { handleSubmit, register } = useForm();

    const [searchInput, setSearchInput] = useState('');
    const [selectCat, setSelectCat] = useState('all');

    handleChange = (e) => { e.preventDefault(); setSearchInput(); }


    const GetSearch = async (data) => {
        try {

            const response = await fetch(`http://localhost:3000/searchVisitor/${searchInput}`);
            console.log("recup data apres JSON:", data)

            const dataSearch = await response.json();
            console.log("donnees dataSearch", dataSearch)

            setSearchInput(dataSearch.searchInput);
            setSearchLevel(dataSearch.SearchLevel);
            setSearchCategory(dataSearch.SearchCategory);
            setSearchSubCategory(dataSearch.SearchSubCategory);
            console.log('donnees du state inputSearch:', dataSearch);
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
        }
    }
    // useEffect(() => { GetSearch() }, [searchInput]);

    return (

        <>
            <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' role="logo" /></a>

            <form className="search" onSubmit={handleSubmit(GetSearch)}>
                <input type="search" name="search" placeholder="rechercher" defaultValue={searchInput} onChange={handleChange} aria-label='faite votre recherche' />

                <SearchLevel handleSubmit={handleSubmit} register={register} />
                <SearchCategory handleSubmit={handleSubmit} register={register} />
                <SearchSubCategory handleSubmit={handleSubmit} register={register} selectCat={selectCat} setSelectCat={setSelectCat} />

                <button ><img className="btnSearch" src={search} alt=' icone de recherche' /></button>
            </form >
        </>
    )

}
export default Search;