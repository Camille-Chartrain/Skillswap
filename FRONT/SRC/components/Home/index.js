import { React, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import Cards from "../Cards";
import NavHome from "../NavHome";
import NavLogged from "../Dashboard/NavLogged";
import Cookies from 'js-cookie';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

            const response = await fetch(`https://${process.env.REACT_APP_API_URL}`, {
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
            <Helmet>
                <meta name="description" content="Bienvenue sur la page d'accueil de Skillswap. 
                Découvrez des compétences que vous aimeriez acquérir grâce à notre communauté." />
                <title>Accueil - Skillswap</title>
            </Helmet>

            <div className="home">
                <header>
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
                </header>

                <main className="main">
                    <div className="pres_search">
                        <section className="presentation">
                            <p className="border-display">
                                Dilettants, passionnés, professionnels,
                            </p>
                            <p >
                                <span className="display">
                                    partagez </span>vos talents  !
                            </p>
                        </section>

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
                </main >
            </div >
        </>
    )

}






export default Home;
