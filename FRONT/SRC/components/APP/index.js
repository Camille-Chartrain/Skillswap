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
import Header from '../header';
import Footer from '../footer';





//* we call render on the container and give it the component for the view.here we placed the router to display the routes to navigate between the components



//= Routes displayed depending if you are logged or not..
// const isLogged = false;




//* components added for the user rendering
const App = ({ darkMode }) => {

    const themeClass = darkMode ? '.light' : '.dark';
    return (
        <body className={themeClass}>
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
                <ToggleBtn />
            </header>
            <footer><Footer /></footer>
        </body>
    )
}
export default App;