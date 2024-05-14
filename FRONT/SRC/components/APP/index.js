
import Header from '../header';
import Footer from '../footer';
import Home from "../home";
import Registration from "../registration";
import Login from "../login";
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonIcon from '@mui/icons-material/Person';
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
                    <Link to="/registration">{<PersonAddIcon />}</Link>
                    <Link to="/login">{<PersonIcon />}</Link>
                </nav >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registration" exact element={<Registration />} />
                    <Route path="/login" exact element={<Login />} />
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