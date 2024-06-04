
import Header from '../header';
import NavBar from '../navBar/NavBar';
import Footer from '../footer';
import Home from "../home";
import Registration from "../registration";
import addUser from '../../style/pictures/addUser.svg';
import Login from "../login";
import login from '../../style/pictures/login.svg';
import dashboard from '../../style/pictures/dashboard.svg';
import Dashboard from '../dashboard';
import { DarkModeContext, PageError, isLogged } from '../../util';
import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SkillUpDate from '../skillList/skillUpDate';








//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components



//* components added for the user rendering
const App = ({ darkMode, isLogged }) => {

    const [error, setError] = useState([]);

    //-> create un dark theme in useContext for using in all app
    const themeClass = useContext(DarkModeContext);
    const theme = darkMode === 'light' ? 'dark' : 'light';
    console.log('je suis ds app, theme:', theme);

    // -> hook form create to post datas
    const { handleSubmit, register } = useForm({ mode: 'onSubmit' });


    return (
        <div className={theme}>
            {/*//->create a router to deserve all front page s and add a navigate function for redirect user if he logged */}

            <Router >
                <div className='headerSite'>
                    <Header />
                    <nav className="nav">
                        {isLogged && isLogged ? { display: 'none' } : (
                            <>
                                <NavLink to="/registration"><img className="" src={addUser} alt='icone creation nouveau compte' /></NavLink>
                                <NavLink to="/login"><img className="" src={login} alt="icone connexion" /></NavLink>
                            </>
                        )
                        }
                        {/* //-> this page appear when the user is logged  keep only for maintenance */}
                        <NavLink to="/dashboard"><img className="" src={dashboard} alt="icone tableau de bord" /></NavLink>

                    </nav >
                    <NavBar />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registration" exact element={<Registration handleSubmit={handleSubmit} register={register} />} />
                    <Route path="/login" exact element={<Login handleSubmit={handleSubmit} register={register} />} />
                    <Route path="/dashboard" exact element={<Dashboard handleSubmit={handleSubmit} register={register} setError={setError} error={error} />} />
                    <Route path="/oneSkill" element={<SkillUpDate handleSubmit={handleSubmit} register={register} />} />
                    <Route path="*" element={<PageError />} />
                </Routes>

            </Router>
            <div>

            </div>
            <Footer />
        </div>
    )
}
export default App;