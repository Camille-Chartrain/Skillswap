import { React, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import Cards from "../Cards";
import NavHome from "../NavHome";
import NavLogged from "../Dashboard/NavLogged";
import Cookies from 'js-cookie';
import './style.scss';
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
        <div className="home">
            {logged && <NavLogged
                setLogged={setLogged}
                setSearchInput={setSearchInput}
                setSelectedLevel={setSelectedLevel}
                setSelectedSubCategory={setSelectedSubCategory}
                setSelectedCategory={setSelectedCategory}
                setNoMatch={setNoMatch}
                setMatch={setMatch}
            />}
            {!logged && <NavHome />}

            <div className="pres_search">
                <section className="presentation">
                    <div className="border-display">
                        Dilettants, passionnés, professionnels,
                    </div>
                    <div >
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
            </div>

            <Cards
                dataCards={dataCards}
                match={match}
                noMatch={noMatch}
                loading={loading}
            />

            {
                !loading && !logged &&
                <button
                    className="join_button"
                    onClick={handleClickRegistration}
                    aria-label="Inscription"
                >
                    Rejoindre la communauté

                </button>
            }
        </div >
    )

}






export default Home;