import { link } from "fs";
import { createContext, useState } from "react";
import Search from "../search";
import Registration from "../registration";
import Login from "../login";
import Dashboard from "../dashboard";
import Profile from "../profile";
import Learning from "../learning";
import Statistic from "../statistic";
import Communication from "../communication";
import SkillList from "../skillList";


//*creation dark mode 
// import { useContext } from "react";
// import { ThemeContext } from "../../util";

// const theme = useContext(ThemeContext);
// const [theme, setTheme] = useState('light');
// const toggleTheme = () => { setTheme(theme === 'light' ? 'dark' : 'light') };

//* components added for the user rendering
const App = () => {

    return (
        <main>
            <Communication />
            <Dashboard />
            <Learning />
            <Login />
            <Profile />
            <Registration />
            <Search />
            <SkillList />
            <Statistic />
        </main>
    )
}
export default App;