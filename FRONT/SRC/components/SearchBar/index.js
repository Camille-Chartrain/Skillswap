import React from "react";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Level from "./Level";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./style.scss"


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
    setMatch,
    setNoMatch,
    setLoading,
    setLogged
}) {

    const navigate = useNavigate();

    async function handleSearch(event) {

        event.preventDefault();

        try {
            // console.log("nous sommes dans la fonction handleSearch deSearchbar");
            // console.log("selectedCategory dans try", selectedCategory);
            // console.log("selectedSubCategory dans try", selectedSubCategory);
            // console.log("selectLevel dans try", selectedLevel);
            setLoading(true)

            const token = Cookies.get('token');

            const response = await fetch(`https://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/${REACT_APP_API}/searchVisitor?input=${searchInput}&level=${selectedLevel}&CategoryId=${selectedCategory}&SubCategoryId=${selectedSubCategory}`, {
                method: "get",
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const responseDataSearch = await response.json();
            // console.log("reponse GetSearch responseDataSearch", responseDataSearch);
            // console.log("responseDataSearch.message", responseDataSearch.message);
            // console.log("typeof responseDataSearch", typeof responseDataSearch);
            setLoading(false);

            if (responseDataSearch.message === "no match") {
                setMatch(false);
                setNoMatch(true);
                // console.log("NO MATCH state match dans Search", match);
                // console.log("NOT MATCH state noMatch dans Search", noMatch);

                if (!responseDataSearch.isLogged) {
                    setLogged(false);
                    navigate('/');
                }
                else if (responseDataSearch.isLogged) {
                    setLogged(true);
                    navigate('/dashboard/results');
                }
            }
            else if (responseDataSearch) {
                // console.log("on est dans la condition il y a match");
                // console.log("responseDataseaarch", responseDataSearch);
                setDataCards(responseDataSearch);
                setMatch(true);
                setNoMatch(false);

                if (!responseDataSearch.isLogged) {
                    setLogged(false);
                    navigate('/');
                }
                else if (responseDataSearch.isLogged) {
                    setLogged(true);
                    navigate('/dashboard/results');
                };
            }
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
            // prévoir une gestion des erreurs
        }
    }

    const handleChangeInput = (event) => {
        setSearchInput(event.target.value);
        // console.log("input:", event.target.value);
    };

    return (
        <form
            className="searchBar"
            method="GET"
            action=""
            onSubmit={handleSearch}
        >

            <div >
                <input
                    className="searchElement"
                    type="text"
                    name="keyWord"
                    id="keyword"
                    value={searchInput}
                    placeholder="bouture, crochet, robe..."
                    onChange={handleChangeInput}
                >
                </input>
                <label htmlFor="keyWord"></label>
            </div>

            <div >
                <Categories
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>

            <div>
                <SubCategories
                    selectedCategory={selectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                />
            </div>

            <div>
                <Level
                    setSelectedLevel={setSelectedLevel}
                />
            </div>
            <div>
                <button
                    className="searchButton"
                    type="submit"
                >
                    Rechercher
                </button>
            </div>
        </form >
    )
}
