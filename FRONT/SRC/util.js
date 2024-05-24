
//= create dark mode context
import { createContext, useContext, useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import *as yup from "yup";

import sunAndMoon from './style/pictures/sunAndMoon.svg';
//-> need to create a context


export const DarkModeContext = createContext('light');

//-> to surround my root for the use of the dark theme
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState('light');
    ; const toggleDarkMode = () => {
        setDarkMode(prevState => !prevState);
    }
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

//-> the toggle button
export const ToggleBtn = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    console.log(darkMode);
    return <button onClick={toggleDarkMode} className="darkBtn"> <img className="" src={sunAndMoon} alt='icone dark theme' /></button>
}



//= function to redirect to home with error message
export const PageError = () => {
    return
    <h1>Une erreur est survenue</h1>
    console.status(error.message);
}

//= Routes displayed depending if you are logged or not..
export const isLogged = false;

// export const schema = yup.object().shape({
//     firstname: yup.string().required(),
//     lastname: yup.string().required(),
//     email: yup.string().required(),
//     password: yup.string().required(),
//     newPassword: yup.string().required(),
// });