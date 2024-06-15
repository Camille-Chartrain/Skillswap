import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';
import SkillList from "../skillList";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Home = ({ skillsList, setSkillsList, dataSearch, match, noMatch }) => {
    console.log("state match dans Results", match);
    console.log("state noMatch dans Results", noMatch);
    console.log("state dataSearch dans Results", dataSearch);

    const navigate = useNavigate();

    const handleClick = async () => {

        try {
            console.log("dans le handleclick pour se déco");
            // console.log("deconnection => supprimer cookie. (composant Dashboard)");
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/logout`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            // console.log("response", response);
            const resultLogout = await response.json();
            // console.log('response component dashboard logout:', resultLogout);

            // delete cookie JWT on client's side
            let thisToken = Cookies.remove('token');
            thisToken = null
            if (thisToken == null) {
                // console.log("token", thisToken);
                navigate("/");
            }
        }
        catch (error) {
            console.log("erreur :", error);
        };
    }

    return (
        <main>
            <div className='ancre'>
                <>
                    <a href="/dashboard#profile" alt=" profile du membre" ><img className="" src={account_icon} alt='icone du profil ' /></a>
                    <a href="/dashboard#learning" alt=" apprentissage du membre" ><img className="" src={school} alt='icone apprentissage ' /></a>
                    <a href="/dashboard#statistic" alt=" statistic " ><img className="" src={statistic} alt='icone des statistiques ' /></a>
                    <a href="/dashboard#communication" alt=" communication " ><img className="" src={message} alt='icone de communication ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleClick} />
                </>
            </div>
            <section>
                < SkillList
                    skillList={skillsList}
                    setSkillsList={setSkillsList}
                    dataSearch={dataSearch}
                    match={match}
                    noMatch={noMatch}
                />
            </section>
        </main>
    )

}






export default Home;