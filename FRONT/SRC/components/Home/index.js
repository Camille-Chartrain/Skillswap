import { React, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import Cards from "../Cards";
import NavHome from "../NavHome";
import NavLogged from "../Dashboard/NavLogged";
import Cookies from 'js-cookie';
import style from './home.scss';
import { useNavigate } from 'react-router-dom';

const Home = ({
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
    loading,
    setLoading,
    logged,
    setLogged
}) => {

    console.log("state match dans Home", match);
    console.log("state noMatch dans Home", noMatch);

    const Get4Courses = async () => {

        setLoading(true)

        try {

            const token = Cookies.get('token');

            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const dataCardsHome = await response.json();

            console.log("dataCardsHome.isLogged", dataCardsHome.isLogged);
            setLogged(dataCardsHome.isLogged);

            setDataCards(dataCardsHome);
            console.log("reponse dataCardsHome du get4courses page home", dataCardsHome);
            console.log("state dataCards", dataCards);
            setLoading(false)
        }
        catch (error) {
            console.error(error.message);
            // setError("Votre demmande n'a pas ete prise en compte");
            // handleNotFoundError("Votre demande n'a pas ete prise en compte");
        }


    }
    useEffect(() => {
        Get4Courses();
    }, []);


    const navigate = useNavigate();

    function handleClickRegistration() {
        navigate('/registration');
    }


    return (
        <>
            {logged && <NavLogged
                setLogged={setLogged}
            />}
            {!logged && <NavHome />}

            <section>
                Dilettants, passionés, professionnels,
                <div>
                    <span className="display">
                        partagez </span>vos talents  !
                </div>
            </section >

            {!logged && <SearchBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                dataCards={dataCards}
                setDataCards={setDataCards}
                match={match}
                setMatch={setMatch}
                noMatch={noMatch}
                setNoMatch={setNoMatch}
                setLoading={setLoading}
                setLogged={setLogged}

            />
            }

            <section className="allCards">
                <Cards
                    dataCards={dataCards}
                    match={match}
                    noMatch={noMatch}
                    loading={loading}
                />
            </section>
            {!loading && !logged &&
                <button
                    onClick={handleClickRegistration}
                    aria-label="Inscription"
                    className="join_button"
                >
                    En voir plus, Rejoindre la communauté

                </button>}
        </>
    )

}






export default Home;