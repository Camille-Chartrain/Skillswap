
import SkillList from "../skillList";

const Home = ({ skillsList, setSkillsList }) => {



    return (
        <main>
            <article>
                <h1>SKILLSWAP C'est...</h1>
                <p>presentation concept</p>
            </article>
            <section>
                < SkillList setSkillsListt={setSkillsList} />
            </section>
        </main>
    )

}






export default Home;