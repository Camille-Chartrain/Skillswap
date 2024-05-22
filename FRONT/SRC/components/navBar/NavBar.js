
import Search from "../search/Search";
import { ToggleBtn } from '../../util';


//->ariana wire's icones
import dashboard from '../../style/pictures/dashboard.svg';
import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';


// import { isLogged } from '../../util';


//= Routes displayed depending if you are logged or not.. with islogged


const NavBar = () => {
    return (
        <>
            <span className="arianaWire">
                <div className='searchBar'>
                    <Search />
                    <ToggleBtn />
                </div>
                <div className='ancre'>
                    <>
                        {/* <a href="/dashboard" alt="dashboard du membre" ><img className="" src={dashboard} alt=' icone du tableau de bord ' /></a> */}
                        <a href="#profile" alt=" profile du membre" ><img className="" src={account_icon} alt='icone du profil ' /></a>
                        <a href="#learning" alt=" apprentissage du membre" ><img className="" src={school} alt='icone apprentissage ' /></a>
                        <a href="#statistic" alt=" statistic " ><img className="" src={statistic} alt='icone des statistiques ' /></a>
                        <a href="#communication" alt=" communication " ><img className="" src={message} alt='icone de communication ' /></a>
                        <a href="#logout" alt=" deconnection du site" ><img className="" src={logout} alt='icone de deconnexion' /></a>
                        {/* ) : (<a href="/" alt="accueil" ></a>)} */}
                    </>
                </div>

            </span >
        </>
    )
}
export default NavBar;