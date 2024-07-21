import { React, useEffect } from "react";
import Cards from "../components/Cards";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


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
        setLogged
    }
) {

    const navigate = useNavigate();

    async function getData() {
        try {

            console.log("déclenchement fonction getData comp Dashboard");

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
            if (responseDataSearch.error === "Token invalide") {
                navigate('/login')
            }

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
                    // navigate('/dashboard');
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
                    // navigate('/dashboard');
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
        setLogged(true);
        getData();
    }, []);

    return (
        <div>
            <h1>Results</h1>

            <Cards
                dataCards={dataCards}
                match={match}
                noMatch={noMatch}
                loading={loading}
            />
        </div>
    )
}