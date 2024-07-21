import React from "react";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Level from "./Level";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function SearchBar({
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedLevel,
    setSelectedLevel,
    searchInput,
    setSearchInput,
    setDataCards,
    match,
    setMatch,
    noMatch,
    setNoMatch,
    setLoading,
    setLogged
}) {

    const navigate = useNavigate();


    async function handleSearch(event) {

        event.preventDefault();

        try {

            console.log("nous sommes dans la fonction handleSearch");
            setLoading(true)
            console.log("selectedCategory dans try", selectedCategory);
            console.log("selectedSubCategory dans try", selectedSubCategory);
            console.log("selectLevel dans try", selectedLevel);

            const token = Cookies.get('token');

            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/searchVisitor?input=${searchInput}&level=${selectedLevel}&CategoryId=${selectedCategory}&SubCategoryId=${selectedSubCategory}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const responseDataSearch = await response.json();
            console.log("reponse GetSearch responseDataSearch", responseDataSearch);
            console.log("responseDataSearch.message", responseDataSearch.message);
            console.log("typeof responseDataSearch", typeof responseDataSearch);


            if (responseDataSearch.message === "no match") {
                setMatch(false);
                setNoMatch(true);
                setLoading(false);
                console.log("NO MATCH state match dans Search", match);
                console.log("NOT MATCH state noMatch dans Search", noMatch);

                if (responseDataSearch.isLogged === false) {
                    setLogged(false);
                    navigate('/');
                }
                else if (responseDataSearch.isLogged === true) {
                    setLogged(true);
                    navigate('/dashboard/results');
                }
            }
            else if (responseDataSearch) {
                console.log("on est dans la condition il y a match");
                console.log("responseDataseaarch", responseDataSearch);
                setDataCards(responseDataSearch);
                setMatch(true);
                setNoMatch(false);
                setLoading(false);

                if (responseDataSearch.isLogged === false) {
                    setLogged(false);
                    navigate('/');
                }
                else if (responseDataSearch.isLogged === true) {
                    setLogged(true);
                    navigate('/dashboard/results');
                };
            }
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
            // setError("Votre recherche n'aq pas pu aboutir");
            // handleNotFoundError("Votre recherche n'aq pas pu aboutir");
        }
    }

    const handleChangeInput = (event) => {
        setSearchInput(event.target.value);
        console.log("input:", event.target.value);
    };

    return (
        <form method="GET" action="" onSubmit={handleSearch}>

            <label htmlFor="keyWord">Mot clé</label>
            <input
                type="text"
                name="keyWord"
                id="keyword"
                value={searchInput}
                onChange={handleChangeInput}
            >
            </input>

            <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <SubCategories
                selectedCategory={selectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
            />
            <Level
                setSelectedLevel={setSelectedLevel}
            />
            <button type="submit">Envoyer</button>
        </form>
    )
}