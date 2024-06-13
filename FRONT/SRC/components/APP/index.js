
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
import Error from '../error/error';
import { DarkModeContext } from '../../util';
import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SkillUpDate from '../skillList/skillUpDate';
import SkillToSee from '../skillList/skillToSee';








//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components



//* components added for the user rendering
const App = ({ darkMode, handleNotFoundError }) => {

    const [error, setError] = useState([]);
    const isLogged = false;

    //-> create un dark theme in useContext for using in all app
    const themeClass = useContext(DarkModeContext);
    const theme = darkMode === 'light' ? 'dark' : 'light';
    // console.log('je suis ds app, theme:', theme);

    // -> hook form create to post datas
    const { handleSubmit, register, setValue, reset } = useForm({ mode: 'onChange' });


    return (
        <div className={theme}>
            {/*//->create a router to deserve all front page s and add a navigate function for redirect user if he logged */}

            <Router >
                <div className='headerSite'>
                    <Header />


                    <nav className="nav">

                        {/* {isLogged ? ( */}
                        <>
                            <NavLink to="/registration"><img className="" src={addUser} alt='icone creation nouveau compte' /></NavLink>
                            <NavLink to="/login"><img className="" src={login} alt="icone connexion" /></NavLink>
                        </>
                        {/* ) : (null)
                        } */}


                    </nav >
                    {/* //-> this page appear when the user is logged  keep only for maintenance */}
                    {/* <NavLink to="/dashboard"><img className="" src={dashboard} alt="icone tableau de bord" /></NavLink> */}



                    <NavBar />
                </div>
                <Routes>
                    <Route path="/" element={<Home handleNotFoundError={handleNotFoundError} />} />

                    <Route path="/registration" exact element={<Registration handleSubmit={handleSubmit} register={register} handleNotFoundError={handleNotFoundError} />} />

                    <Route path="/login" exact element={<Login handleSubmit={handleSubmit} register={register} reset={reset} handleNotFoundError={handleNotFoundError} />} />

                    <Route path="/dashboard" exact element={<Dashboard handleSubmit={handleSubmit} register={register} setError={setError} error={error} reset={reset} setValue={setValue} handleNotFoundError={handleNotFoundError} />} />

                    <Route path="/oneSkill" element={<SkillUpDate handleSubmit={handleSubmit} register={register} setValue={setValue} reset={reset} handleNotFoundError={handleNotFoundError} />} />

                    <Route path="/dashboard/seeASkill" element={<SkillToSee setValue={setValue} handleNotFoundError={handleNotFoundError} />} />

                    <Route path="*" element={<Error />} />

                </Routes>

            </Router >
            <div>

            </div>
            <Footer />
        </div >
    )
}
export default App;