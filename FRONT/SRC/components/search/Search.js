import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from './logo.png';
import Cookies from 'js-cookie';


const Search = ({ }) => {


    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectLevel, setSelectLevel] = useState('all');

    const { handleSubmit, register } = useForm();
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState({});//->aj

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    const GetSearch = useCallback(async (data) => {
        try {
            console.log("nous sommes dans la fonction getSearch");
            console.log('data', data);

            console.log("selectedCategory dans try", selectedCategory.id);
            // console.log("selectedSubCategory dans try", selectedSubCategory.id);
            console.log("selectLevel dans try", selectLevel);
            // console.log("req data avant JSON:", data)
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/searchVisitor?input=${searchInput}&level=${selectLevel}&CategoryId=${selectedCategory.id}&SubCategoryId=${selectedSubCategory.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            console.log("recup data apres JSON:", data)

            const dataSearch = await response.json();
            console.log("reponse GetSearch dataSearch", dataSearch)
            // setData(dataSearch);

            // setSearchInput(dataSearch);
            // setSelectLevel(dataSearch);
            // setSelectCategory(dataSearch);
            // setSelectSubCategory(dataSearch);
            // console.log('donnees du state inputSearch:', dataSearch);
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
        }
    }, [searchInput, selectLevel, selectedCategory, selectedSubCategory]);

    useEffect(() => { GetSearch(); }, []);

    return (

        <>
            <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' role="logo" /></a>

            <form method="GET" className="search" onSubmit={handleSubmit(GetSearch)} >

                <input
                    type="search"
                    name="searchInput"
                    placeholder="rechercher"
                    value={searchInput}
                    onChange={handleChange}
                    aria-label='faite votre recherche'
                />

                <SearchLevel
                    handleSubmit={handleSubmit}
                    register={register}
                    setSelectLevel={setSelectLevel}
                    selectLevel={selectLevel}
                />

                <SearchCategory
                    handleSubmit={handleSubmit}
                    register={register}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                />

                <button><img className="btnSearch" src={search} alt=' icone de recherche' /></button>
            </form >
        </>
    )

}
export default Search;