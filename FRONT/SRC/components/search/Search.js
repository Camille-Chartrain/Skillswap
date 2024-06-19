import search from '../../style/pictures/search.svg';
import SearchCategory from './SearchCategory';
import SearchLevel from './SearchLevel';
import { ToggleBtn } from '../../util';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from './logo.png';
import Cookies from 'js-cookie';
import SkillList from '../skillList';
import { useNavigate } from "react-router-dom";
import Error from '../error/error';



const Search = ({ dataSearch, setDataSearch, match, setMatch, noMatch, setNoMatch, setError, error, handleNotFoundError }) => {


    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectLevel, setSelectLevel] = useState("");

    const { handleSubmit, register } = useForm();
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    const [data, setData] = useState({});//->aj

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    const GetSearch = useCallback(async () => {
        try {
            // console.log("nous sommes dans la fonction getSearch");

            // console.log("selectedCategory dans try", selectedCategory);
            // console.log("selectedSubCategory dans try", selectedSubCategory);
            // console.log("selectLevel dans try", selectLevel);

            const token = Cookies.get('token');

            const response = await fetch(`http://localhost:3000/searchVisitor?input=${searchInput}&level=${selectLevel}&CategoryId=${selectedCategory?.id}&SubCategoryId=${selectedSubCategory?.id}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const responseDataSearch = await response.json();
            // console.log("reponse GetSearch responseDataSearch", responseDataSearch)
            // console.log("typeof responseDataSearch", typeof responseDataSearch);

            setSelectedSubCategory(null)

            if (responseDataSearch === "no match") {
                setMatch(false)
                setNoMatch(true)
                // console.log("NO MATCH state match dans Search", match);
                // console.log("NOT MATCH state noMatch dans Search", noMatch);
            }
            else if (responseDataSearch) {
                console.log("on est dans la condition il y a match");
                setDataSearch(responseDataSearch);
                setMatch(true);
                setNoMatch(false)

                // console.log("MATCH State dataSearch", dataSearch);
                // console.log("MATCH state Match dans Search", match);
                // console.log("MATCH state noMatch dans Search", noMatch);

                //    fetch dashboard instead
                try {
                    console.log('dans le search apres match ok, verif si logué');
                    const token = Cookies.get('token');
                    const response = await fetch(`http://localhost:3000/dashboard`, {
                        method: "get",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    // console.log("response avant json:", response)
                    const authResult = await response.json();
                    // console.log("authResult apres json dans Search pour voir  resultats:", authResult)

                    if (authResult == "access granted") {
                        console.log("acces granted dans handleclik Skill, on va afficher les resultats dans /Results");
                        navigate('/results')
                    }
                }
                catch (error) {
                    console.error("catch de handleClick dans Skill:", error);
                    // setError("Votre recherche n'aq pas pu aboutir");
                    // handleNotFoundError("Votre recherche n'aq pas pu aboutir");
                }
            };
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
            setError("Votre recherche n'aq pas pu aboutir");
            handleNotFoundError("Votre recherche n'aq pas pu aboutir");
        }
    }, [searchInput, selectLevel, selectedCategory, selectedSubCategory]);

    useEffect(() => { }, []);

    return (

        <>
            {error && <Error error={error} />}
            <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' role="logo" /></a>

            <form method="GET" className="search" onSubmit={handleSubmit(GetSearch)} >
                <span className='skillList'>
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
                </span>
                <SearchCategory
                    handleSubmit={handleSubmit}
                    register={register}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                />
                <span className='skillList'>
                    <button><img className="btnSearch" src={search} alt=' icone de recherche' /></button>
                    {/* <ToggleBtn /> */}
                </span>
            </form >
        </>
    )

}
export default Search;