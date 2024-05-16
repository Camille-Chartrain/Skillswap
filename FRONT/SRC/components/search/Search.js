import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import SearchSubCategory from './SearchSubCategory';
import { useEffect, useState } from 'react';

const Search = ({ setSearchLevel, searchLevel, setSearchCategory, searchCategory, setSearchSubCategory, searchSubCategory }) => {

    const [input, setSearchInput] = useState('');


    const handleSubmit = () => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setSearchLevel(e.target.value);
        setSearchCategory(e.target.value);
        setSearchSubCategory(e.target.value);
    }

    const GetSearchInput = async () => {
        const response = await fetch(`http://localhost:3000/searchVisitor/:${input}?/:${searchLevel}?/:${searchCategory}?/:${searchSubCategory}?`)
    }
    useEffect(() => { GetSearchInput(), [input] })

    return (

        <>
            <form className="search" onSubmit={handleSubmit} >
                <input type="search" placeholder="rechercher" value={input} />
                <SearchLevel />
                <SearchCategory />
                <SearchSubCategory />
                <button><img className="" src={search} alt=' icone de recherche' /></button>
            </form >
        </>
    )
}
export default Search;