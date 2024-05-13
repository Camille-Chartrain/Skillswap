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


//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components

//= Routes displayed depending if you are logged or not..
// const isLogged = false;

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
                    </div>
                    <BrowserRouter className="navbar">
                        <nav>
                            <>
                                <Link to="/">search</Link>
                                <Link to="/registration">registration</Link>
                                <Link to="/login">login</Link>
                            </>
                            {/* {isLogged ? ( */}
                            <>
                                <Link to="/dashboard">dashboard</Link>
                                <Link to="/profile">profile</Link>
                                <Link to="/learning">learning</Link>
                                <Link to="/statistic">statistis</Link>
                                <Link to="/communication">communication</Link>
                                <Link to="/logout">logout</Link>
                            </>
                            {/* ) : (<Link to="/" />)} */}
                        </nav >
                        <Routes>
                            <Route path="/" element={<Search />} />
                            <Route path="/registration" exact element={<Registration />} />
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/dashboard" exact element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/learning" element={<Learning />} />
                            <Route path="/statistic" element={<Statistic />} />
                            <Route path="/communication" element={<Communication />} />
                            <Route path="*" element={<PageError />} />
                        </Routes>
                    </BrowserRouter>
                </span>
                <ToggleBtn />
            </header >
        </>

    )
}
export default Header;