import { Routes, Route } from "react-router-dom";
import { React, useEffect, useState } from "react";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Statistics from "./components/statistic/Statistics";
import Notifications from "./components/Notification";
import Desk from "./components/Desk";
import Registration from "./components/Registration";
import Login from "./components/Login";




function App() {

    const [dataCards, setDataCards] = useState({
        rows: [],
        count: 0,
        resultCount: 0,
    });
    const [match, setMatch] = useState(false);
    const [noMatch, setNoMatch] = useState(false);

    const [loading, setLoading] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [searchInput, setSearchInput] = useState("");


    return (
        <div className="App">
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

                    />}
                />
                <Route path="/dashboard"
                    element={<Dashboard
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
                    />} >
                    <Route path="/dashboard/profile"
                        element={<Profile
                            setDataCards={setDataCards}
                        />}
                    />
                    <Route path="/dashboard/statistics"
                        element={<Statistics
                            setDataCards={setDataCards}
                        />}
                    />
                    <Route path="/dashboard/notifications"
                        element={<Notifications
                            setDataCards={setDataCards}
                        />}
                    />
                    <Route path="/dashboard/desk"
                        element={<Desk
                            setDataCards={setDataCards}
                        />}
                    />
                </Route>

                <Route path="/registration"
                    element={<Registration />}
                />
                <Route path="/login"
                    element={<Login />}
                />
            </Routes>
        </div >
    );
}

export default App;