import { React, useEffect } from "react";
import Cards from "../Cards";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SearchBar from "../SearchBar";


export default function Results(
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
        setLogged,
        setSwappies
    }
) {

    const navigate = useNavigate();

    async function getData() {
        try {

            console.log("déclenchement fonction getData comp Result");

            console.log("selectedCategory dans try", selectedCategory);
            console.log("selectedSubCategory dans try", selectedSubCategory);
            console.log("selectLevel dans try", selectedLevel);
            console.log("searchInput dans try", searchInput);

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
            if (responseDataSearch.error === "Token invalide") {
                navigate('/login')
            }

            if (responseDataSearch.message === "no match") {
                setMatch(false);
                setNoMatch(true);
                setLoading(false);
                setSwappies(responseDataSearch.userSwappies.swappies)
                console.log("NO MATCH state match dans Search", match);
                console.log("NOT MATCH state noMatch dans Search", noMatch);

                if (!responseDataSearch.isLogged) {
                    setLogged(false);
                    navigate('/');
                }
                else if (responseDataSearch.isLogged) {
                    setLogged(true);
                }
            }
            else if (responseDataSearch) {
                console.log("on est dans la condition il y a match");
                console.log("responseDataseaarch", responseDataSearch);
                setDataCards(responseDataSearch);
                setMatch(true);
                setNoMatch(false);
                setLoading(false);
                setSwappies(responseDataSearch.userSwappies.swappies)

                if (!responseDataSearch.isLogged) {
                    setLogged(false);
                    navigate('/');
                }
                else if (responseDataSearch.isLogged) {
                    setLogged(true);
                }

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
        getData();
    }, []);

    return (
        <div>
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
                setLogged={setLogged} />


            <Cards
                dataCards={dataCards}
                match={match}
                noMatch={noMatch}
                loading={loading}
            />
            <p>Fin des résultats</p>
        </div>
    )
}