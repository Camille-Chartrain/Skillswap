import { link } from "fs";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useRouteError } from "react-router-dom";
// import { ThemeContext } from "../../util";
import { PageError } from "../../util";
import Header from "../header";
import Main from "../main";
import Footer from "../footer";
import Search from "../search";
import Registration from "../registration";
import Login from "../login";
import Dashboard from "../dashboard";
import Profile from "../profile";
import Learning from "../learning";
import Statistic from "../statistic";
import Communication from "../communication";


// const [theme, setTheme] = useState('light');
// const toggleTheme = () => { setTheme(theme === 'light' ? 'dark' : 'light') };


const App = () => {

    return (
        <>
            <div>
                <Router>
                    <nav>
                        <ul>
                            if(!islogged){
                                <>
                                    <li><Link to="/registration">img avat+</Link></li>
                                    <li><Link to="/login">img avat</Link></li>
                                </>
                            }
                            else{
                                <>
                                    <li><Link to="/dasboard">img </Link></li>
                                    <li><Link to="/profile">img avat</Link></li>
                                    <li><Link to="/learning">img avat</Link></li>
                                    <li><Link to="/statistic">img avat</Link></li>
                                    <li><Link to="/communication">img avat</Link></li>
                                </>
                            }
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/search' component={Search} >icone </Route>
                        <Route path='/registration' component={Registration} >icone </Route>
                        <Route path='/login' component={Login}>icone </Route>
                        <Route path='/dashboard' component={Dashboard}>icone </Route>
                        <Route path='/profile' component={Profile} >icone </Route>
                        <Route path='/learning' component={Learning} >icone </Route>
                        <Route path='/statistic' component={Statistic} >icone </Route>
                        <Route path='/communication' component={Communication} >icone </Route>
                        <Route path='*' component={PageError} />
                        <Route path="/logout">icone logout</Route>.
                    </Routes>
                </Router>
            </div>
            <>
                {/* <ThemeContext.Provider value={theme} /> */}
                <Header />
                <h1>HELLO WORD</h1>
                <Main />
                <Footer />
            </>
        </>
    )
}
export default App;