import React from "react";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Level from "./Level";
import { useLocation, useNavigate } from 'react-router-dom';


export default function SearchBar({
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedLevel,
    setSelectedLevel,
    searchInput,
    setSearchInput,
    dataCards,
    setDataCards,
    match,
    setMatch,
    noMatch,
    setNoMatch,
    setLoading
}) {

    const location = useLocation();
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
            console.log("reponse GetSearch responseDataSearch", responseDataSearch)
            console.log("typeof responseDataSearch", typeof responseDataSearch);

            setSelectedSubCategory(null)
            setSearchInput("");

            if (responseDataSearch === "no match") {
                setMatch(false)
                setNoMatch(true)
                setLoading(false)
                console.log("NO MATCH state match dans Search", match);
                console.log("NOT MATCH state noMatch dans Search", noMatch);
            }
            else if (responseDataSearch) {
                console.log("on est dans la condition il y a match");
                console.log("responseDataseaarch", responseDataSearch);
                setDataCards(responseDataSearch);
                setMatch(true);
                setNoMatch(false)
                setLoading(false)

                // console.log("MATCH State dataSearch", dataSearch);
                // console.log("MATCH state Match dans Search", match);
                // console.log("MATCH state noMatch dans Search", noMatch);


                if (location.pathname === '/dashboard/profile'
                    || location.pathname === '/dashboard/statistics'
                    || location.pathname === '/dashboard/notifications'
                    || location.pathname === '/dashboard/desk'
                    || location.pathname === '/dashboard'
                ) {
                    try {
                        console.log('dans le search apres match ok, verif si logué');
                        const token = Cookies.get('token');
                        const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/dashboard`, {
                            method: "get",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        console.log("response avant json:", response)
                        const authResult = await response.json();
                        console.log("authResult apres json dans Search pour voir  resultats:", authResult)

                        if (authResult == "access granted") {
                            console.log("acces granted dans handleclik Skill, on va afficher les resultats dans /dashboard");
                            navigate('/dashboard');
                        }
                    }
                    catch (error) {
                        console.error("catch de handleClick dans Skill:", error);
                        // setError("Votre recherche n'aq pas pu aboutir");
                        // handleNotFoundError("Votre recherche n'aq pas pu aboutir");
                    }
                }
            };
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
            // setError("Votre recherche n'aq pas pu aboutir");
            // handleNotFoundError("Votre recherche n'aq pas pu aboutir");
        }
    }

    useEffect(() => { }, [searchInput, selectedLevel, selectedCategory, selectedSubCategory]);

    const handleChangeInput = (event) => {
        setSearchInput(event.target.value);
        console.log("input:", event.target.value);
    };

    return (
        <form method="GET" action="" onSubmit={handleSearch}>

            <label htmlFor="keyWord">Mot clé</label>
            <input type="text" name="keyWord" id="keyword" onChange={handleChangeInput}></input>

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