import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import SearchSubCategory from './SearchSubCategory';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from './logo.png';
import Cookies from 'js-cookie';


const Search = ({ setSelectLevel, setSelectCategory, setSelectSubCategory, selectCat, selectLevel, selectSubCat }) => {

    const { handleSubmit, register } = useForm();

    const [searchInput, setSearchInput] = useState('');

    handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    const GetSearch = useCallback(async (data) => {
        try {
            console.log("req data avant JSON:", data)
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/searchVisitor/?${searchInput}/?level=${selectLevel}/?categoryId=${selectCat}/?subCategoryId=${selectSubCat}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'

            });

            // console.log("recup data apres JSON:", data)

            const dataSearch = await response.json();
            console.log("donnees dataSearch", dataSearch)

            setSearchInput(dataSearch);
            setSelectLevel(dataSearch);
            setSelectCategory(dataSearch);
            setSelectSubCategory(dataSearch);
            console.log('donnees du state inputSearch:', dataSearch);
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
        }
    })

    useEffect(() => { GetSearch(); }, [searchInput, selectLevel, selectCat, selectSubCat]);

    return (

        <>
            <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' role="logo" /></a>

            <form method="GET" className="search" onSubmit={handleSubmit(GetSearch)}>
                <input type="search" name="searchInput" placeholder="rechercher" value={searchInput} onChange={handleChange} aria-label='faite votre recherche' />

                <SearchLevel handleSubmit={handleSubmit} register={register} />
                <SearchCategory handleSubmit={handleSubmit} register={register} />
                <SearchSubCategory handleSubmit={handleSubmit} register={register} />

                <button ><img className="btnSearch" src={search} alt=' icone de recherche' /></button>
            </form >
        </>
    )

}
export default Search;