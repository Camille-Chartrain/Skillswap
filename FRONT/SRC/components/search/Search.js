import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import { ToggleBtn } from '../../util';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from './logo.png';
import Cookies from 'js-cookie';


const Search = ({ }) => {


    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectLevel, setSelectLevel] = useState("");

    const { handleSubmit, register } = useForm();
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState({});//->aj

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    const GetSearch = useCallback(async () => {
        try {
            console.log("nous sommes dans la fonction getSearch");

            console.log("selectedCategory dans try", selectedCategory);
            console.log("selectedSubCategory dans try", selectedSubCategory);
            console.log("selectLevel dans try", selectLevel);

            console.log("selectedCategory dans try", selectedCategory);
            console.log("selectedSubCategory dans try", selectedSubCategory);
            console.log("selectLevel dans try", selectLevel);

            const token = Cookies.get('token');

            const response = await fetch(`http://localhost:3000/searchVisitor?input=${searchInput}&level=${selectLevel}&CategoryId=${selectedCategory?.id}&SubCategoryId=${selectedSubCategory?.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const dataSearch = await response.json();
            console.log("reponse GetSearch dataSearch", dataSearch)
            // console.log('donnees du state inputSearch:', dataSearch);
            // setSelectLevel("");
            // setSelectedCategory(null);
            // setSelectedSubCategory(null);
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
        }
    }, [searchInput, selectLevel, selectedCategory, selectedSubCategory]);

    useEffect(() => { }, []);

    return (

        <>
            <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' role="logo" /></a>

            <form method="GET" className="search" onSubmit={handleSubmit(GetSearch)} >
                <div className='skillList'>
                    <input
                        type="search"
                        name="searchInput"
                        placeholder="Rechercher"
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
                </div>
                <SearchCategory
                    handleSubmit={handleSubmit}
                    register={register}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                />
                <div className='skillList'>
                    <button><img className="btnSearch" src={search} alt=' icone de recherche' /></button>
                    <ToggleBtn />
                </div>
            </form >
        </>
    )

}
export default Search;