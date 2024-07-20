import { React, useEffect } from "react";
import SearchBar from "../SearchBar";
import Cards from "../Cards";
import NavLogged from "../NavLogged";
import Cookies from 'js-cookie';

export default function Dashboard(
    {
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedLevel,
        setSelectedLevel,
        searchInput,
        setSearchInput,
        setDataCards,
        dataCards,
        match,
        setMatch,
        noMatch,
        setNoMatch,
        loading,
        setLoading,
        setLogged
    }
) {


    async function getData() {
        try {


            console.log("déclenchement fonction getData comp Dashboard");

            // setSelectedSubCategory(null)
            // setSearchInput("");
            // setSelectedCategory(null);
            // setSelectedLevel("");
            // :setLoading(true)

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

            };
        }
        catch (error) {
            console.log('erreur du catch GetSearch:', error);
            // setError("Votre recherche n'aq pas pu aboutir");
            // handleNotFoundError("Votre recherche n'aq pas pu aboutir");
        }
    }

    useEffect(() => {
        setLogged(true);
        getData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <NavLogged
                setLogged={setLogged}
            />
            <SearchBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setDataCards={setDataCards}
                match={match}
                setMatch={setMatch}
                noMatch={noMatch}
                setNoMatch={setNoMatch}
                setLoading={setLoading}
            />
            <Cards
                dataCards={dataCards}
                match={match}
                noMatch={noMatch}
                loading={loading}
            />
        </div>
    )
}