import { useContext } from "react";
import { DarkModeContext } from "../../util";
import Search from "../search";
import Registration from "../registration";
import Login from "../login";
import Dashboard from "../dashboard";
import Profile from "../profile";
import Learning from "../learning";
import Statistic from "../statistic";
import Communication from "../communication";
import SkillList from "../skillList";







//* components added for the user rendering
const App = () => {
    const { darkMode } = useContext(DarkModeContext);
    const themeClass = darkMode ? 'light' : 'dark';

    return (
        <div className={themeClass}>
            <main >
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
        </div >
    )
}
export default App;