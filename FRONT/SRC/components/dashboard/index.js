// import { useForm, isValid } from "react-hook-form";
import Profile from "../profile";
import Learning from '../learning';
import Statistic from '../statistic';
import Communication from '../communication';




//->ariana wire's icones
import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import CourseStudent from "../learning/courseStudent";



const Dashboard = ({ handleSubmit, register, isValid, reset }) => {
    const navigate = useNavigate();

    const handleClick = async () => {


        try {
            console.log("dans la fonction handleclick");
            // delete cookie JWT on client's side
            let token = Cookies.remove('token');
            token = null
            if (token == null) {
                console.log("token", token);
                navigate("/");
            }

        }
        catch (error) {
            console.log("erreur :", error);
        };
    }



    return (

        <>
            <div className='ancre'>
                <>
                    <a href="#profile" alt=" profile du membre" ><img className="" src={account_icon} alt='icone du profil ' /></a>
                    <a href="#learning" alt=" apprentissage du membre" ><img className="" src={school} alt='icone apprentissage ' /></a>
                    <a href="#statistic" alt=" statistic " ><img className="" src={statistic} alt='icone des statistiques ' /></a>
                    <a href="#communication" alt=" communication " ><img className="" src={message} alt='icone de communication ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleClick} />
                </>
            </div>
            <main>
                <h1>TABLEAU DE BORD</h1>
                <Profile handleSubmit={handleSubmit} register={register} reset={reset} />
                <Learning handleSubmit={handleSubmit} register={register} />
                <Statistic handleSubmit={handleSubmit} register={register} />
                <Communication handleSubmit={handleSubmit} register={register} />
            </main>
        </>


    )
};
export default Dashboard;