import { React, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import Cards from "../Cards";
import NavHome from "../NavHome";
import NavLogged from "../NavLogged";

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
    logged
}) => {

    console.log("state match dans Home", match);
    console.log("state noMatch dans Home", noMatch);

    const Get4Courses = async () => {

        setLoading(true)

        try {
            const response = await fetch(`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`);

            const dataCardsHome = await response.json();
            setDataCards(dataCardsHome);
            console.log("reponse dataCardsHome du get4courses page home", dataCardsHome);
            console.log("state dataCards", dataCards);
            setLoading(false)
        }
        catch (error) {
            console.error(error.message);
            setError("Votre demmande n'a pas ete prise en compte");
            handleNotFoundError("Votre demande n'a pas ete prise en compte");
        }
    }
    useEffect(() => {
        Get4Courses();
    }, []);


    return (
        <>
            {logged && <NavLogged />}
            {!logged && <NavHome />}
            <SearchBar
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

            />
            <article  >
                <h1>SKILLSWAP </h1>
                <span>Une plateforme d'échange et d’apprentissage qui permet de mettre en relation des personnes de tout âge et aux profils variés qui souhaitent apprendre ou partager leur compétence et leurs talents avec les autres.
                    Fonctionnant sur le principe que chaque utilisateur est à la fois professeur et élève, elle
                    donne accès à une communauté de gens très variée, et une foule de savoir à dispositions.
                    Le swappie; la monnaie virtuelle de notre site; est là pour encourager ce système. A chaque fois qu’un cours est donne, on recoit un swappie, que l’on pourra  ensuite dépenser pour assister aux cours de son choix.
                </span>
            </article>
            <Cards
                dataCards={dataCards}
                match={match}
                noMatch={noMatch}
                loading={loading}
            />
            {!loading && <p>Voir plus ICONE INSCRIPTION</p>}
        </>
    )

}






export default Home;