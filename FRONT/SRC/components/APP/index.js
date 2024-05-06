import { link } from "fs";
import { Outlet, RouterProvider, createBrowserRouter, useRouteError } from "react-router-dom";
import { createContext } from "react";
import Router from "../route/Router";


const themeContext = createContext('light')



const App = () => {

    return (
        <>
            <themeContext.Provider value={theme} >
                <RouterProvider router={Router} />
                <h1>HELLO WORD</h1>
            </themeContext.Provider>
        </>
    );
}
export default App;