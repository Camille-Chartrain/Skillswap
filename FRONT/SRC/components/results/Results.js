import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';
import dashboard from "../../style/pictures/dashboard.svg"
import SkillList from "../skillList";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Home = ({ skillsList, setSkillsList, dataSearch, match, noMatch, setMatch, setNoMatch, setIsAuthenticated, isAuthenticated }) => {
    console.log("state match dans Results", match);
    console.log("state noMatch dans Results", noMatch);
    console.log("state dataSearch dans Results", dataSearch);

    const navigate = useNavigate();

    const handleClick = async () => {

        try {
            // setIsAuthenticated(false)
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/logout`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            setMatch(false);
            setNoMatch(false);

            const resultLogout = await response.json();

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
        <>
            <span className='ancre'>
                <>
                    <a href="/dashboard#profile" alt=" profile du membre" ><img className="" src={dashboard} alt='icone du profil ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleClick} />
                </>
            </span>
            <section>
                < SkillList
                    skillList={skillsList}
                    setSkillsList={setSkillsList}
                    dataSearch={dataSearch}
                    match={match}
                    noMatch={noMatch}
                />
            </section>
        </>
    )
}






export default Home;