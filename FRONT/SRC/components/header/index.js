import React from "react";
import BannerPc from './pictures/BannerPc.png';
import logo from './pictures/logo.png';
import { ToggleBtn } from '../../util';

//->ariana wire's icones
import dashboard from '../../style/pictures/dashboard.svg';
import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';
import search from '../../style/pictures/search.svg';



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
                        <button><img className="" src={search} alt=' icone de recherche' /></button>
                    </div>
                    <div>
                        {/* {isLogged ? ( */}
                        <>
                            <a href="/dashboard" alt="dashboard du membre" ><img className="" src={dashboard} alt=' icone du tableau de bord ' /></a>
                            <a href="#profile" alt=" profile du membre" ><img className="" src={account_icon} alt='icone du profil ' /></a>
                            <a href="#learning" alt=" apprentissage du membre" ><img className="" src={school} alt='icone apprentissage ' /></a>
                            <a href="#statistic" alt=" statistic " ><img className="" src={statistic} alt='icone des statistiques ' /></a>
                            <a href="#communication" alt=" communication " ><img className="" src={message} alt='icone de communication ' /></a>
                            <a href="#logout" alt=" deconnection du site" ><img className="" src={logout} alt='icone de deconnexion' /></a>
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