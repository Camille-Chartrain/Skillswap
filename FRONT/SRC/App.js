import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Statistics from "./components/statistic/Statistics";
import Notifications from "./components/communication/Notifications";
import TeachingDesk from "./components/learning/TeachingSpace";




function App() {

    // const [dataSearch, setDataSearch] = useState({
    //     rows: [],
    //     count: 0,
    //     resultCount: 0,
    // });
    // const [match, setMatch] = useState(false);
    // const [noMatch, setNoMatch] = useState(false);



    return (
        <div className="App">
            <Routes>
                <Route path="/"
                    element={<Home />}
                />
                <Route path="/dashboard"
                    element={<Dashboard />}>

                    <Route path="/dashboard/profile"
                        element={<Profile />}
                    />
                    <Route path="/dashboard/statistics"
                        element={<Statistics />}
                    />
                    <Route path="/dashboard/notifications"
                        element={<Notifications />}
                    />
                    <Route path="/dashboard/teachingDesk"
                        element={<TeachingDesk />}
                    />
                </Route>

            </Routes>
        </div>
    );
}

/* <span className='headerSite'>
        <Header />

        <nav className="nav">
            <>
                <NavLink to="/registration"><img className="" src={addUser} alt='icone creation nouveau compte' /></NavLink>
                <NavLink to="/login"><img className="" src={login} alt="icone connexion" /></NavLink>
            </>
        </nav >
    
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
                handleNotFoundError={handleNotFoundError}
                error={error}
                setError={setError}
            />}
        />

        <Route path="/dashboard/seeASkill" element={
            <SkillToSee
                setValue={setValue}
                handleNotFoundError={handleNotFoundError}
                error={error}
                setError={setError}
            />}
        />

        <Route path="/results" element={
            <Results
                dataSearch={dataSearch}
                match={match}
                setMatch={setMatch}
                noMatch={noMatch}
                setNoMatch={setNoMatch}
                handleNotFoundError={handleNotFoundError}
                error={error}
                setError={setError}
            />}
        />

        <Route path="/admin" element={
            <UsersList
                setError={setError} error={error} handleNotFoundError={handleNotFoundError}
            />
        } />

        <Route path="/admin/user" element={
            <User
                setError={setError}
                error={error}
                handleNotFoundError={handleNotFoundError}
                handleSubmit={handleSubmit}
                register={register}
                reset={reset}
                setValue={setValue}
            />
        } />

        <Route path="*" element={<Error error={error} setError={setError} />} />

    </Routes>

</Router >
<span>

</span>
<Footer />
</span >
)
} */
export default App;