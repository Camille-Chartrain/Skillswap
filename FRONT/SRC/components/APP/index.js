
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
import { isLogged } from '../../util';
import Results from '../results/Results';
import UsersList from '../admin/usersList';
import User from '../admin/user/index';

//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components

//* components added for the user rendering
const App = ({ darkMode }) => {


    //=error's state management
    const [error, setError] = useState(null);
    //= 404 statemanagement
    const handleNotFoundError = (error) => {
        setError(error);
    };


    const [dataSearch, setDataSearch] = useState({
        rows: [],
        count: 0,
        resultCount: 0,
    });
    const [match, setMatch] = useState(false);
    const [noMatch, setNoMatch] = useState(false);


    //-> create un dark theme in useContext for using in all app
    const themeClass = useContext(DarkModeContext);
    const theme = darkMode === 'light' ? 'dark' : 'light';
    // console.log('je suis ds app, theme:', theme);

    // -> hook form create to post datas
    const { handleSubmit, register, setValue, reset } = useForm({ mode: 'onChange' });


    return (
        <span className={theme}>
            {/*//->create a router to deserve all front page s and add a navigate function for redirect user if he logged */}

            <Router >
                <span className='headerSite'>
                    <Header />
                    {/* {
                        isLogged ? (null)
                            : ( */}
                    <nav className="nav">
                        <>
                            <NavLink to="/registration"><img className="" src={addUser} alt='icone creation nouveau compte' /></NavLink>
                            <NavLink to="/login"><img className="" src={login} alt="icone connexion" /></NavLink>
                        </>
                    </nav >
                    {/* )
                    } */}

                    {/* //-> this page appear when the user is logged  keep only for maintenance
                        {/* <NavLink to="/dashboard"><img className="" src={dashboard} alt="icone tableau de bord" /></NavLink> */}

                    <NavBar
                        dataSearch={dataSearch}
                        setDataSearch={setDataSearch}
                        match={match}
                        setMatch={setMatch}
                        noMatch={noMatch}
                        setNoMatch={setNoMatch}
                    // onReset={handleReset}
                    />
                </span>
                <Routes>
                    <Route path="/" element={
                        <Home
                            handleNotFoundError={handleNotFoundError}
                            dataSearch={dataSearch}
                            match={match}
                            noMatch={noMatch}
                        />}
                    />

                    <Route path="/registration" exact element={<Registration handleSubmit={handleSubmit} register={register} handleNotFoundError={handleNotFoundError} error={error} setError={setError} />} />

                    <Route path="/login" exact element={<Login handleSubmit={handleSubmit} register={register} reset={reset} handleNotFoundError={handleNotFoundError} error={error} setError={setError} />} />

                    <Route path="/dashboard" exact element={
                        <Dashboard
                            handleSubmit={handleSubmit}
                            register={register}
                            setError={setError}
                            error={error}
                            reset={reset}
                            setValue={setValue}
                            handleNotFoundError={handleNotFoundError}
                        />}
                    />

                    <Route path="/oneSkill" element={
                        <SkillUpDate
                            handleSubmit={handleSubmit}
                            register={register}
                            setValue={setValue}
                            reset={reset}
                            handleNotFoundError={handleNotFoundError} error={error} setError={setError}
                        />}
                    />

                    <Route path="/dashboard/seeASkill" element={
                        <SkillToSee
                            setValue={setValue}
                            handleNotFoundError={handleNotFoundError} error={error} setError={setError}
                        />}
                    />

                    <Route path="/results" element={
                        <Results
                            dataSearch={dataSearch}
                            match={match}
                            setMatch={setMatch}
                            noMatch={noMatch}
                            setNoMatch={setNoMatch}
                            handleNotFoundError={handleNotFoundError} error={error} setError={setError}
                        />}
                    />

                    <Route path="/admin" element={
                        <UsersList setError={setError} error={error} handleNotFoundError={handleNotFoundError} />
                    } />

                    <Route path="/user" element={
                        <User setError={setError} error={error} handleNotFoundError={handleNotFoundError} />
                    } />

                    <Route path="*" element={<Error error={error} setError={setError} />} />

                </Routes>

            </Router >
            <span>

            </span>
            <Footer />
        </span >
    )
}
export default App;