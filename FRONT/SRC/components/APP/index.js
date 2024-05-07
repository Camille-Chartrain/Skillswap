import { link } from "fs";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useRouteError } from "react-router-dom";
import { PageError } from "../../util";
import Footer from "../footer";
import Search from "../search";
import Registration from "../registration";
import Login from "../login";
import Dashboard from "../dashboard";
import Profile from "../profile";
import Learning from "../learning";
import Statistic from "../statistic";
import Communication from "../communication";
import SkillList from "../skillList";
import Home from "../home";

// import { useContext } from "react";
// import { ThemeContext } from "../../util";

// const theme = useContext(ThemeContext);
// const [theme, setTheme] = useState('light');
// const toggleTheme = () => { setTheme(theme === 'light' ? 'dark' : 'light') };


const App = () => {

    return (
        <>
            <header>
                <img src="" alt="banniere du site Skillswap" />
                <button id="dark" >dark icone jour nuit</button>
                <a href="/" alt="logo du site" >logo</a>
                <div>
                    <input type="search" value="" placeholder="Rechercher" />
                    <button>loupe</button>
                </div>
            </header>
            <div>
                <Router>
                    <nav>
                        <ul>
                            <li><Link to='/'>home</Link></li>
                            <li><Link to="/registration">registration</Link></li>
                            <li><Link to="/login">login</Link></li>
                            <li><Link to="/dasboard">dashboard</Link></li>
                            <li><Link to="/profile">profile</Link></li>
                            <li><Link to="/learning">learning</Link></li>
                            <li><Link to="/statistic">statistis</Link></li>
                            <li><Link to="/communication">communication</Link></li>
                            <li><Link to="/logout">logout</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/search' component={<Search />} />
                        <Route path='/registration' component={<Registration />} />
                        <Route path='/login' component={<Login />} />
                        <Route path='/dashboard' component={<Dashboard />} />
                        <Route path='/profile' component={<Profile />} />
                        <Route path='/learning' component={<Learning />} />
                        <Route path='/statistic' component={<Statistic />} />
                        <Route path='/communication' component={<Communication />} />
                        <Route path='*' component={<PageError />} />
                    </Routes>
                </Router>
            </div >
            <>
                {/* <ThemeContext.Provider value={theme} /> */}
                <h1>HELLO WORD</h1>

                <Search />
                <SkillList />
            </>
        </>
    )
}
export default App;