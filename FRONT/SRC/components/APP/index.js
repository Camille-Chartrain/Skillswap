import { link } from "fs";
import { Outlet, RouterProvider, createBrowserRouter, useRouteError } from "react-router-dom";


//= je cree mes routes afin de pouvoir creer une nav cote front

//=dans chaque comp. partent creer une nav avec les liens specifiques puis creer une div contenant le comp.<Outlet/> afin que la nav affiche touts les enfants et dans chaque enfants

const Outlet = () => {
    return
    <>
        <NavLink to="/">img logo</NavLink>
        <NavLink to="/search">img loupe</NavLink>
        <NavLink to="/registration">img avat+</NavLink>
        <NavLink to="/login">img avat</NavLink>
        <NavLink to="/dasboard">img </NavLink>
        <NavLink to="/profile">img avat</NavLink>
        <NavLink to="/learning">img avat</NavLink>
        <NavLink to="/statistic">img avat</NavLink>
        <NavLink to="/communication">img avat</NavLink>
    </>
}

const PageError = () => {
    const error = useRouteError();
    return
    <h1>Une erreur est survenue</h1>
}

const router = createBrowserRouter(

    [
        {
            path: '/',
            element: (
                <>
                    <NavHome /> //-> mise en place du outler et navlink ds cette nav a creer ds le comp. parent
                    <Home />
                </>),
            errorElement: <PageError />,
            children: [
                {
                    path: 'search',
                    element: <SkillList />
                },
                {
                    path: 'registration',
                    element: <RegistrationForm />,
                },
                {
                    path: 'login',
                    element: (
                        <>
                            <NavLogin />//-> mise en place navlink et outlet
                            <LoginForm />
                        </>
                    ),
                    children: [
                        {
                            path: 'dashbord',
                            element: (
                                <>
                                    <NavDashboard />//-> mise en place navlink et outlet
                                    <Dashboard />,
                                </>
                            ),
                            children: [
                                {
                                    path: 'profile',
                                    element: <Profile />,
                                },
                                {
                                    path: 'learning',
                                    element: <Learning />,
                                },
                                {
                                    path: 'statistic',
                                    element: <Statistic />,
                                },
                                {
                                    path: 'communication',
                                    element: <Communication />,
                                },
                            ]
                        },
                        {
                            path: 'logout',
                            element: <img />
                        },
                    ]
                },

            ]
        },
    ]
)



const App = () => {

    return (
        <>
            <RouterProvider router={router} />
            <h1>HELLO WORD</h1>
        </>
    );
}
export default App;