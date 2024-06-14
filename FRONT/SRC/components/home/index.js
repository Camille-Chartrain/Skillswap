
import SkillList from "../skillList";

const Home = ({ skillsList, setSkillsList, dataSearch, match }) => {
    console.log("state match dans Home", match);

    console.log("state dataSearch dans Home", dataSearch);


    return (
        <main>
            <article  >
                <h1>SKILLSWAP C'est...</h1>
                <p>Une plateforme d'échange et d’apprentissage qui permet de mettre en relation des personnes de tout âge et aux profils variés qui souhaitent apprendre ou partager leur compétence et leurs talents avec les autres.
                    Fonctionnant sur le principe que chaque utilisateur est à la fois professeur et élève, elle
                    donne accès à une communauté de gens très variée, et une foule de savoir à dispositions.
                    Le swappie; la monnaie virtuelle de notre site; est là pour encourager ce système. A chaque fois qu’un cours est donne, on recoit un swappie, que l’on pourra  ensuite dépenser pour assister aux cours de son choix.
                </p>
            </article>
            <section>
                < SkillList
                    skillList={skillsList}
                    setSkillsList={setSkillsList}
                    dataSearch={dataSearch}
                    match={match}
                />
            </section>
        </main>
    )

}






export default Home;