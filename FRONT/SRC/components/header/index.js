import React from "react";
import BannerPc from './pictures/BannerPc.png';
import logo from './pictures/logo.png';
import { ToggleBtn } from '../../util';

//->ariana wire's icones
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CommentIcon from '@mui/icons-material/Comment';
import SchoolIcon from '@mui/icons-material/School';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';



const search = async () => {
    try {
        const response = await fetch("https://localhost:3000");

        const title = await response.json();
        console.log(title)
    }
    catch (error) {
        console.error(error.message);
    }
}
search()


//= Routes displayed depending if you are logged or not..
// const isLogged = false;

const Header = () => {
    return (
        <>
            <header>
                <img className="banner" src={BannerPc} alt='banniere du site Skillswap' />
                <span className="arianaWire">
                    <a href="/" alt="logo du site ramenant a l'accueil" ><img className="logo" src={logo} alt='logo du site Skillswap' /></a>
                    <div className="search">
                        <input type="search" placeholder="rechercher" />
                        <select>Level</select>
                        <select>category</select>
                        <select>sub-category</select>
                        <button>{<SearchIcon />}</button>
                    </div>
                    <div>
                        {/* {isLogged ? ( */}
                        <>
                            <a href="#dashboard" alt="dashboard du membre" ><img className="" src={<DashboardIcon />} alt=' icone du tableau de bord ' /></a>
                            <a href="#profile" alt=" profile du membre" ><img className="" src={<ManageAccountsIcon />} alt='icone du profil ' /></a>
                            <a href="#learning" alt=" apprentissage du membre" ><img className="" src={<SchoolIcon />} alt='icone apprentissage ' /></a>
                            <a href="#statistic" alt=" statistic " ><img className="" src={<LeaderboardIcon />} alt='icone des statistiques ' /></a>
                            <a href="#communication" alt=" communication " ><img className="" src={<CommentIcon />} alt='icone de communication ' /></a>
                            <a href="#logout" alt=" deconnection du site" ><img className="" src={<PersonOffIcon />} alt='icone de deconnexion' /></a>
                            {/*
                            */}
                        </>
                        {/* ) : ( <a href="/" alt="accueil" ></a>)} */}
                    </div>
                    <ToggleBtn />



                </span>
            </header >
        </>

    )
}
export default Header;