import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import SearchSubCategory from './SearchSubCategory';
import { useEffect, useState } from 'react';
import logo from './logo.png';

const Search = ({ setSearchLevel, searchLevel, setSearchCategory, searchCategory, setSearchSubCategory, searchSubCategory }) => {

    const [input, setSearchInput] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setSearchLevel(e.target.value);
        setSearchCategory(e.target.value);
        setSearchSubCategory(e.target.value);
        console.log(searchLevel);
    }

    const GetSearchInput = async () => {
        try {
            // const response = await fetch(`http://localhost:3000/searchVisitor/:${input}?/:${searchLevel}?/:${searchCategory}?/:${searchSubCategory}?`);
            const dataSearch = await response.json();
            setSearchInput(dataSearch);
            setSearchLevel(dataSearch);
            setSearchCategory(dataSearch);
            setSearchSubCategory(dataSearch);
            console.log(dataSearch);
        }
        catch (error) {
            console.log('error.message');
        }
    }
    useEffect(() => { GetSearchInput() }, [input])

    return (

        <>
            <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' role="logo" /></a>
            {/* {isLogged ? ( */}
            <form className="search" onSubmit={handleSubmit} >
                <input type="search" placeholder="rechercher" value={input} onChange={handleChange} aria-label='faite votre recherche' />
                <SearchLevel />
                <SearchCategory />
                <SearchSubCategory />
                <button ><img className="btnSearch" src={search} alt=' icone de recherche' /></button>
            </form >
        </>
    )
}
export default Search;