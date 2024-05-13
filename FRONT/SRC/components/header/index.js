import React from "react";
import BannerPc from './pictures/BannerPc.png';
import logo from './pictures/logo.png';


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "../search";
import Registration from "../registration";
import Login from "../login";
import Dashboard from "../dashboard";
import Profile from "../profile";
import Learning from "../learning";
import Statistic from "../statistic";
import Communication from "../communication";
import { PageError, ToggleBtn } from '../../util';




const Header = () => {
    return (
        <>
            <header>
                <img className="banner" src={BannerPc} alt='banniere du site Skillswap' />
                <span className="arianaWire">
                    <a href="/" alt="logo du site" ><img className="logo" src={logo} alt='blogo du site Skillswap' /></a>
                    <div className="search">
                        <input type="search" placeholder="rechercher" />
                        <button>loupe</button>
                        <ToggleBtn />
                    </div>

                </span>
            </header >
        </>

    )
}
export default Header;