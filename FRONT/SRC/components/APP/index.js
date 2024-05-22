
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
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';


//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components



//* components added for the user rendering
const App = ({ darkMode }) => {

    //-> create un dark theme in useContext for using in all app
    const themeClass = useContext(DarkModeContext);
    const theme = darkMode === 'light' ? 'dark' : 'light';
    console.log('je suis ds app, theme:', theme);

    //-> hook form create to post datas
    const { handleSubmit, register, formState: { isSubmissing, isSubmitSuccessful }, errors } = useForm({ mode: 'onTouched' });

    return (
        <body className={theme}>

            <Router className="arianaWire">
                <Header />
                <nav className="nav">
                    <NavLink to="/registration"><img className="" src={addUser} alt='icone creation nouveau compte' /></NavLink>
                    <NavLink to="/login"><img className="" src={login} alt="icone connexion" /></NavLink>
                    {/* {isLogged ? ( */}
                    <NavLink to="/dashboard"><img className="" src={dashboard} alt="icone tableau de bord" /></NavLink>
                    {/* ) : (<NavLink to="/" alt="accueil" ></NavLink>
                    )} */}
                </nav >
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/registration" element={<Registration handleSubmit={handleSubmit} register={register} errors={errors} isSubmissing={isSubmissing} isSubmitSuccessful={isSubmitSuccessful} />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/dashboard" exact element={<Dashboard />} />
                    <Route path="*" element={<PageError />} />
                </Routes>
            </Router>

            <Footer />
        </body>
    )
}
export default App;