import './index.scss';
import 'reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Search from "../SRC/components/search";
import Registration from "../SRC/components/registration";
import Login from "../SRC/components/login";
import Dashboard from "../SRC/components/dashboard";
import Profile from "../SRC/components/profile";
import Learning from "../SRC/components/learning";
import Statistic from "../SRC/components/statistic";
import Communication from "../SRC/components/communication";
import { PageError, ToggleBtn } from './util';
import Header from './components/header';
import Footer from './components/footer';

import { DarkModeProvider } from './util';








//=container is the element that will contain the entire app, it retrieves a div with a given id
const container = document.getElementById("app");

//=root is the root element created from the render target in the DOM
const root = createRoot(container);


//= we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components



//= Routes displayed depending if you are logged or not..
// const isLogged = false;


root.render(

    <React.StrictMode>
        <DarkModeProvider>
            <body>
                <header>
                    <Header />
                    <BrowserRouter>
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
                            {/* ) : (<Link to="/" />) */}

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
                    <ToggleBtn />
                </header>
                <footer><Footer /></footer>
            </body>
        </DarkModeProvider>
    </React.StrictMode>
)