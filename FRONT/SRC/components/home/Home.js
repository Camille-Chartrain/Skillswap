
// import SkillList from "../skillList";

const Home = ({ skillsList, setSkillsList, dataSearch, match, noMatch }) => {
    console.log("state match dans Home", match);
    console.log("state noMatch dans Home", noMatch);

    console.log("state dataSearch dans Home", dataSearch);



    return (
        <>
            <article  >
                <h1>SKILLSWAP C'est...</h1>
                <span>Une plateforme d'échange et d’apprentissage qui permet de mettre en relation des personnes de tout âge et aux profils variés qui souhaitent apprendre ou partager leur compétence et leurs talents avec les autres.
                    Fonctionnant sur le principe que chaque utilisateur est à la fois professeur et élève, elle
                    donne accès à une communauté de gens très variée, et une foule de savoir à dispositions.
                    Le swappie; la monnaie virtuelle de notre site; est là pour encourager ce système. A chaque fois qu’un cours est donne, on recoit un swappie, que l’on pourra  ensuite dépenser pour assister aux cours de son choix.
                </span>
            </article>
            {/* <section>
                < SkillList
                    skillList={skillsList}
                    setSkillsList={setSkillsList}
                    dataSearch={dataSearch}
                    match={match}
                    noMatch={noMatch}
                />
            </section> */}
        </>
    )

}






export default Home;