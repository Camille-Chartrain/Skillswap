
import Header from '../header';
import Footer from '../footer';
import Home from "../home";
import Registration from "../registration";
import Login from "../login";
import Dashboard from "../dashboard";
import Profile from "../profile";
import Learning from "../learning";
import Statistic from "../statistic";
import Communication from "../communication";
import { PageError, ToggleBtn } from '../../util';
import { DarkModeContext } from '../../util';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components



//* components added for the user rendering
const App = ({ darkMode }) => {
    const themeClass = useContext(DarkModeContext);
    const theme = darkMode === 'light' ? 'dark' : 'light';
    console.log('je suis ds app, theme:', theme);

    return (
        <body className={theme}>
            <Header />
            <Router className="arianaWire">

                <nav>
                    <>
                        {/* <Link to="/">Home</Link> */}
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
                    <Route path="/" element={<Home />} />
                    <Route path="/registration" exact element={<Registration />} />
                    <Route path="/login" exact element={<Login />} />
                    {/* <Route path="/dashboard" exact element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/statistic" element={<Statistic />} />
                    <Route path="/communication" element={<Communication />} /> */}
                    <Route path="*" element={<PageError />} />
                </Routes>
            </Router>

            <main>

            </main>
            <Footer />
        </body >
    )
}
export default App;