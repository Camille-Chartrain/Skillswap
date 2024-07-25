import { Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Dashboard/Profile";
import Statistics from "./components/Dashboard/statistic";
import Notifications from "./components/Dashboard/Notification";
import Desk from "./components/Dashboard/Desk";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Admin from "./components/Admin";
import PageTracking from "./components/PageTracking";
import Results from "./Results";
import ModifSkill from "./components/Dashboard/Profile/modifSkill";



function App() {

    const [dataCards, setDataCards] = useState({
        rows: [],
        count: 0,
        resultCount: 0,
        isLogged: false
    });
    const [match, setMatch] = useState(false);
    const [noMatch, setNoMatch] = useState(false);

    const [loading, setLoading] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [logged, setLogged] = useState(false)


    return (
        <div className="App">
            <PageTracking
                setSelectedCategory={setSelectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                setSearchInput={setSearchInput}
                setSelectedLevel={setSelectedLevel}
                setDataCards={setDataCards}
                setNoMatch={setNoMatch}
            />
            <Routes>

                <Route path="/"
                    element={<Home
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        setSelectedSubCategory={setSelectedSubCategory}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        dataCards={dataCards}
                        setDataCards={setDataCards}
                        match={match}
                        setMatch={setMatch}
                        noMatch={noMatch}
                        setNoMatch={setNoMatch}
                        loading={loading}
                        setLoading={setLoading}
                        logged={logged}
                        setLogged={setLogged}
                    />}
                />
                <Route path="/dashboard"
                    element={<Dashboard
                        setLogged={setLogged}
                    />}
                >
                    <Route path="/dashboard/results"
                        element={<Results
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            setSelectedSubCategory={setSelectedSubCategory}
                            selectedLevel={selectedLevel}
                            setSelectedLevel={setSelectedLevel}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            dataCards={dataCards}
                            setDataCards={setDataCards}
                            match={match}
                            setMatch={setMatch}
                            noMatch={noMatch}
                            setNoMatch={setNoMatch}
                            loading={loading}
                            setLoading={setLoading}
                            setLogged={setLogged}
                        />}
                    />
                    <Route path="/dashboard/profile"
                        element={<Profile
                            loading={loading}
                            setLoading={setLoading}

                        />}
                    />
                    <Route path="/dashboard/statistics"
                        element={<Statistics
                            loading={loading}
                            setLoading={setLoading}

                        />}
                    />
                    <Route path="/dashboard/notifications"
                        element={<Notifications
                            loading={loading}
                            setLoading={setLoading}

                        />}
                    />
                    <Route path="/dashboard/desk"
                        element={<Desk
                            loading={loading}
                            setLoading={setLoading}

                        />}
                    />
                </Route>

                <Route path="/registration"
                    element={<Registration />}
                />
                <Route path="/login"
                    element={<Login
                        setNoMatch={setNoMatch}
                        setDataCards={setDataCards} />}
                />

                <Route path="/dashboard/profile/modifSkill"
                    element={<ModifSkill
                        loading={loading}
                        setLoading={setLoading}

                    />}
                />
                <Route path="/admin"
                    element={<Admin />}
                />
            </Routes>
        </div >
    );
}

export default App;